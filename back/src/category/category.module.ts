import { Module, forwardRef } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category } from './category.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from '../post/post.model';
import { CategoryPost } from './categoryPost.model';

@Module({
	imports: [SequelizeModule.forFeature([Post, Category, CategoryPost])],
	providers: [CategoryService],
	controllers: [CategoryController],
	exports: [CategoryService],
})
export class CategoryModule {}
