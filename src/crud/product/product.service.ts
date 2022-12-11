import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, SchemaTypes, Types } from 'mongoose';
import { Category } from '../category/category.schema';
import { CreateProductDto, UpdateProductDto } from './dto/ProductDto';
import { Product } from './product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private productModel: Model<Product>,
    @InjectModel('Category') private categoryModel: Model<Category>,
  ) {}

  getById(id: string) {
    const product = this.productModel.findById(id).populate('category');
    return product;
  }

  getAll() {
    const products = this.productModel.find({}).populate('category');
    return products;
  }

  async addProduct(dto: CreateProductDto) {
    const category = this.categoryModel.findById(dto.category);
    if (!category) {
      throw new BadRequestException();
    }
    const product = new this.productModel({
      ...dto,
    });

    await product.save();
    (await category).products.push(product);

    return product;
  }

  async updateProduct(id: string, dto: UpdateProductDto) {
    const newProduct = this.productModel.findByIdAndUpdate(
      new Types.ObjectId(id),
      dto,
    );
  }
}
