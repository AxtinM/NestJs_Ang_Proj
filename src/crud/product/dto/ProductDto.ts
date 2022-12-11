import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description?: string;

  @IsString()
  category: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;
}

export class UpdateProductDto {
  @IsString()
  name?: string;

  @IsString()
  description?: string;

  @IsString()
  //@Transform((value) => new Types.ObjectId(value))
  category?: string;

  @IsNumber()
  price?: number;

  @IsNumber()
  quantity?: number;
}
