import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { AuthService } from '../auth/auth.service';
import { firstValueFrom } from 'rxjs';
import { GenerateContentResponse } from './models/content.model';

@Controller('content')
export class ContentController {
  constructor(
    private contentService: ContentService,
    private authService: AuthService,
  ) { }

  @Post()
  async create(@Body() dto: CreateContentDto): Promise<GenerateContentResponse> {
    return this.contentService.generateContent(dto);
  }
}