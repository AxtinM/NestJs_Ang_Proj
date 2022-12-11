import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop({ required: true })
  hash: string;
}

export const userSchema = SchemaFactory.createForClass(User);
