import { IsNumber, IsString } from 'class-validator';

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
  _id: string;

  @IsString()
  name?: string;

  @IsString()
  description?: string;

  @IsString()
  category?: string;

  @IsNumber()
  price?: number;

  @IsNumber()
  quantity?: number;
}
