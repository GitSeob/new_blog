import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Post } from './post.model';
import { Category } from '../category/category.model';
import { CategoryPost } from '../category/categoryPost.model';
import { MulterModule } from '@nestjs/platform-express';
import { S3Service } from './s3.service';
import { CategoryService } from 'src/category/category.service';

@Module({
	imports: [
		MulterModule.registerAsync({
			useClass: S3Service
		}),
		SequelizeModule.forFeature([Post, Category, CategoryPost]),
	],
	controllers: [PostController],
	providers: [S3Service, CategoryService, PostService],
})
export class PostModule {}
