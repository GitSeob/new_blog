import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { PostController, CategoryController } from './post.controller';
import { PostService } from './post.service';
import { Post } from './post.model';
import { Category } from './category.model';
import { CategoryPost } from './categoryPost.model';
import { MulterModule } from '@nestjs/platform-express';
import { S3Service } from './s3.service';

@Module({
	imports: [
		MulterModule.registerAsync({
			useClass: S3Service
		}),
		SequelizeModule.forFeature([Post, Category, CategoryPost])
	],
	controllers: [PostController, CategoryController],
	providers: [PostService, S3Service],
})
export class PostModule {}
