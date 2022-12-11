import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export class Category extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
  products: any;
}

export const categorySchema = SchemaFactory.createForClass(Category);
