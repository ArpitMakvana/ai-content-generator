import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Content extends Document {
  @Prop({ required: true })
  topic: string;

  @Prop({ required: false, default: '' })
  text: string; // Can be an empty string if OpenAI fails

  @Prop({ type: [String], default: [] })
  imageUrls: string[]; // Array of image URLs or empty if fetch failed

  @Prop({ type: [String], default: [] })
  videoUrls: string[]; // Array of video URLs or empty if fetch failed
}

export const ContentSchema = SchemaFactory.createForClass(Content);
