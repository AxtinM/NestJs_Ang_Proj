import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product } from '../product/product.schema';
import { Category } from './category.schema';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/CategoryDto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private categoryModel: Model<Category>, // @InjectModel('Product') private productModel: Model<Product>,
  ) {}

  async addCategory(dto: CreateCategoryDto) {
    const _id = new Types.ObjectId();
    const category = new this.categoryModel({
      _id,
      ...dto,
    });

    await category.save();

    return category;
  }

  updateCategory(id: string, dto: UpdateCategoryDto) {
    const category = this.categoryModel.findByIdAndUpdate(
      new Types.ObjectId(id),
      dto,
      {
        new: true,
      },
    );

    return category;
  }

  deleteCategory(id: string) {
    console.log(id);
    const category = this.categoryModel.findByIdAndDelete(
      new Types.ObjectId(id),
    );
    return category;
  }

  getAll() {
    const categories = this.categoryModel.find({}).populate('products');
    return categories;
  }

  getById(id: string) {
    const category = this.categoryModel.findById(id).populate('products');
    return category;
  }
}
