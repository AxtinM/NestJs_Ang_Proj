import { Module } from '@nestjs/common';
import { ProductController } from './product/product.controller';
import { CategoryController } from './category/category.controller';
import { CategoryService } from './category/category.service';
import { ProductService } from './product/product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, productSchema } from './product/product.schema';
import { Category, categorySchema } from './category/category.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  controllers: [ProductController, CategoryController],
  providers: [CategoryService, ProductService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: productSchema,
      },
      {
        name: Category.name,
        schema: categorySchema,
      },
    ]),
    PassportModule,
    AuthModule,
  ],
})
export class CrudModule {}
