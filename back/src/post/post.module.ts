import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Post } from './post.model';
import { Category } from './category.model';
import { CategoryPost } from './categoryPost.model';

@Module({
	imports: [
		SequelizeModule.forFeature([Post, Category, CategoryPost])
	],
	controllers: [PostController],
	providers: [PostService],
})
export class PostModule {}
