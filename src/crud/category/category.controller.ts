import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/CategoryDto';

@UseGuards(AuthGuard('jwt'))
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(AuthGuard('role'))
  @Post('')
  addCategory(@Body() dto: CreateCategoryDto) {
    return this.categoryService.addCategory(dto);
  }

  @UseGuards(AuthGuard('role'))
  @Put(':id')
  updateCategory(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.categoryService.updateCategory(id, dto);
  }

  @Get('')
  getAll() {
    return this.categoryService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.categoryService.getById(id);
  }
}
