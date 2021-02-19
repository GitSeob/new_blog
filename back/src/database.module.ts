import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/user.model';
import { Post } from './post/post.model';
import { Category } from './post/category.model';
import { CategoryPost } from './post/categoryPost.model';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';

@Module({
	imports: [
		SequelizeModule.forRoot({
			dialect: 'mysql',
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			models: [User, Post, Category, CategoryPost],
			synchronize: true,
			autoLoadModels: true,
		}),
		UserModule, PostModule
	],
})
export class DatabaseModule {}
