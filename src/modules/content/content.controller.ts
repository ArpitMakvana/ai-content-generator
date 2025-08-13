import {
  Body,
  Controller,
  Headers,
  Post,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';
import { AuthService } from '../auth/auth.service';
import { lastValueFrom } from 'rxjs';

@Controller('content')
export class ContentController {
  constructor(
    private contentService: ContentService,
    private authService: AuthService,
  ) {}

  @Post()
  async create(
    @Body() dto: CreateContentDto,
    @Headers('authorization') authHeader: string,
  ) {
    const token = authHeader?.replace(/^Bearer\s+/i, '');
    if (!token) throw new BadRequestException('Missing token');

    const auth = await lastValueFrom(this.authService.validateUser(token));

    if (!auth?.valid) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return this.contentService.generateContent(dto);
  }
}
