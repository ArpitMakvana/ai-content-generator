import { IsOptional, IsString, IsBoolean, IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateContentDto {
  @IsString()
  @IsNotEmpty()
  topic: string;

  @IsOptional()
  @IsBoolean()
  requireImage?: boolean;

  @IsOptional()
  @IsBoolean()
  requireVideo?: boolean;

  @IsOptional()
  @IsBoolean()
  requireContent?: boolean; // Whether to fetch GPT content

  @IsOptional()
  @IsString()
  format?: 'text' | 'html'; // Output formatting preference

  @IsOptional()
  @IsBoolean()
  saveToDatabase?: boolean;

  @IsOptional()
  @IsBoolean()
  fetchFromDatabase?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  imageLanguages?: string[]; // e.g. ['en', 'hi', 'or']

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  videoLanguages?: string[]; // e.g. ['en', 'hi', 'or']

  @IsOptional()
  @IsString()
  chatLanguage?: string; // Single language for GPT content
}
