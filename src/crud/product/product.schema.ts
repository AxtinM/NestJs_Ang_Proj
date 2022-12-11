import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Category } from '../category/category.schema';

@Schema({ _id: false })
export class Product {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number })
  quantity: number;

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  category: Category;
}

export const productSchema = SchemaFactory.createForClass(Product);
