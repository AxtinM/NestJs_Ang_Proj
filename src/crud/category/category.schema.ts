import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from '../product/product.schema';

@Schema({ _id: false })
export class Category extends Document {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: [Types.ObjectId], ref: 'Product' })
  products: Product[];
}

export const categorySchema = SchemaFactory.createForClass(Category);
