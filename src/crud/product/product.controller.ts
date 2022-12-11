import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/ProductDto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Get('')
  getAll() {
    return this.productService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.productService.getById(id);
  }

  @Post('')
  addProduct(dto: CreateProductDto) {
    return this.productService.addProduct(dto);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, dto: UpdateProductDto) {
    return this.productService.updateProduct(id, dto);
  }
}
