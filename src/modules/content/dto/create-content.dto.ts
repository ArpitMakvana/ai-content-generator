import { IsOptional, IsString, IsBoolean, IsNotEmpty } from 'class-validator';

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
  @IsString()
  format?: 'text' | 'html'; // Output formatting preference

  @IsOptional()
  @IsBoolean()
  saveToDatabase?: boolean; // Whether to save content in DB

  @IsOptional()
  @IsBoolean()
  fetchFromDatabase?: boolean; // Whether to fetch from DB if it exists
}
