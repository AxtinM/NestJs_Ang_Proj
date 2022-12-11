import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export class Product extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number })
  quantity: number;

  @Prop({ type: { type: Types.ObjectId, ref: 'Category' } })
  category: any;
}

export const productSchema = SchemaFactory.createForClass(Product);
