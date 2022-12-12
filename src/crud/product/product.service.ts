import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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
    const product = this.productModel
      .findById(new Types.ObjectId(id))
      .populate('category');
    return product;
  }

  getAll() {
    const products = this.productModel.find({}).populate('category');
    return products;
  }

  async addProduct(dto: CreateProductDto) {
    const category = await this.categoryModel
      .findById(new Types.ObjectId(dto.category))
      .exec();
    if (!category) {
      throw new BadRequestException();
    }
    const product = new this.productModel({
      _id: new Types.ObjectId(),
      ...dto,
    });

    category.products.push(product);
    await product.save();
    category.save();

    console.log('CATEGORY \n :', category);

    return product;
  }

  async updateProduct(id: string, dto: UpdateProductDto) {
    const newProduct = this.productModel.findByIdAndUpdate(
      new Types.ObjectId(id),
      dto,
      {
        new: true,
      },
    );

    return newProduct;
  }

  deleteProduct(id: string) {
    const product = this.productModel.findByIdAndDelete(new Types.ObjectId(id));
    return product;
  }
}
