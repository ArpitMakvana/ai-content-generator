import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Content extends Document {
  @Prop({ required: true })
  topic: string;

  @Prop({ required: false, default: '' })
  text: string; // Can be empty string if OpenAI fails

  @Prop({
    type: Map,
    of: [String],
    default: {},
  })
  imageUrls: Record<string, string[]>; // e.g., { en: ["url1"], hi: ["url2"] }

  @Prop({
    type: Map,
    of: [String],
    default: {},
  })
  videoUrls: Record<string, string[]>; // e.g., { en: ["url1"], hi: ["url2"] }
}

export const ContentSchema = SchemaFactory.createForClass(Content);
