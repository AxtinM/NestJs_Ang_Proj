import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleStrategy } from '../strategy/role.strategy';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/CategoryDto';

@UseGuards(AuthGuard('jwt'))
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(RoleStrategy)
  @Post('')
  addCategory(@Body() dto: CreateCategoryDto) {
    return this.categoryService.addCategory(dto);
  }

  @UseGuards(RoleStrategy)
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

  @UseGuards(RoleStrategy)
  @Delete(':id')
  deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }
}
