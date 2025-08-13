import {
  Injectable,
  Logger,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import OpenAI from 'openai';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, catchError, map, of } from 'rxjs';
import { Content } from './schemas/content.schema';
import { CreateContentDto } from './dto/create-content.dto';

interface ApiError {
  error: true;
  message: string;
}

export interface GenerateContentResponse {
  success: boolean;
  message: string;
  data: {
    topic: string;
    text: string | ApiError;
    imageUrls: string[] | ApiError;
    videoUrls: string[] | ApiError;
  };
}

@Injectable()
export class ContentService {
  private openai: OpenAI;
  private readonly logger = new Logger(ContentService.name);

  constructor(
    @InjectModel(Content.name) private contentModel: Model<Content>,
    private http: HttpService,
  ) {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
  }

  async generateContent(
    dto: CreateContentDto,
  ): Promise<GenerateContentResponse> {
    const topic = dto.topic?.trim().toLowerCase();
    const {
      requireImage = true,
      requireVideo = true,
      format = 'text',
      saveToDatabase = true,
      fetchFromDatabase = true,
    } = dto;

    if (!topic) throw new BadRequestException('Topic is required');

    // Step 1: Check DB
    if (fetchFromDatabase) {
      const existing = await this.contentModel.findOne({
        topic: { $regex: topic, $options: 'i' },
      });

      if (existing) {
        return {
          success: true,
          message: 'Found existing content in database',
          data: {
            topic: existing.topic,
            text: existing.text,
            imageUrls: existing.imageUrls,
            videoUrls: existing.videoUrls,
          },
        };
      }
    }

    // Step 2: Generate Text via OpenAI
    let text: string | ApiError;
    try {
      const prompt =
        format === 'html'
          ? `Explain "${topic}" and format it as HTML.`
          : `Explain "${topic}"`;

      const gptRes = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      });

      text = gptRes.choices[0]?.message?.content ?? '';
    } catch (err) {
      this.logger.error('OpenAI error', err);
      text = { error: true, message: 'Failed to generate content from OpenAI' };
    }

    // Step 3: Fetch Images from Google
    const imageUrls: string[] | ApiError = requireImage
      ? await firstValueFrom(
          this.http
            .get('https://www.googleapis.com/customsearch/v1', {
              params: {
                key: process.env.GOOGLE_API_KEY!,
                cx: process.env.GOOGLE_CX!,
                searchType: 'image',
                q: topic,
                num: 10,
              },
            })
            .pipe(
              map((res) => (res.data.items || []).map((item: any) => item.link)),
              catchError((error) => {
                this.logger.warn('Google Image API failed', error.message);
                return of({
                  error: true,
                  message: 'Failed to fetch images from Google',
                });
              }),
            ),
        )
      : [];

    // Step 4: Fetch Videos from YouTube
    const videoUrls: string[] | ApiError = requireVideo
      ? await firstValueFrom(
          this.http
            .get('https://www.googleapis.com/youtube/v3/search', {
              params: {
                key: process.env.YOUTUBE_API_KEY!,
                q: topic,
                part: 'snippet',
                type: 'video',
                maxResults: 10,
              },
            })
            .pipe(
              map((res) =>
                (res.data.items || [])
                  .map((item: any) => item.id.videoId)
                  .filter((id: string) => !!id)
                  .map((id: string) => `https://www.youtube.com/watch?v=${id}`),
              ),
              catchError((error) => {
                this.logger.warn('YouTube API failed', error.message);
                return of({
                  error: true,
                  message: 'Failed to fetch videos from YouTube',
                });
              }),
            ),
        )
      : [];

    // Step 5: Save to DB (if allowed)
    if (saveToDatabase) {
      try {
        const content = new this.contentModel({
          topic,
          text: typeof text === 'string' ? text : '',
          imageUrls: Array.isArray(imageUrls) ? imageUrls : [],
          videoUrls: Array.isArray(videoUrls) ? videoUrls : [],
        });

        await content.save();
      } catch (err) {
        this.logger.error('DB Save Failed', err);
      }
    }

    // Final Response
    return {
      success: true,
      message: 'Content generated with partial or full data',
      data: {
        topic,
        text,
        imageUrls,
        videoUrls,
      },
    };
  }
}
