import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import {SequelizeModule} from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { User } from './user/user.model';
import { Post } from './post/post.model';
import { Category } from './category/category.model';
import { CategoryPost } from './category/categoryPost.model';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			ignoreEnvFile: process.env.NODE_ENV === 'production',
			validationSchema: Joi.object({
				NODE_ENV: Joi.string().valid('dev', 'development', 'production', 'test').required(),
				DB_HOST: Joi.string().required(),
				DB_PORT: Joi.string().required(),
				DB_USERNAME: Joi.string().required(),
				DB_PASSWORD: Joi.string().required(),
				DB_DATABASE: Joi.string().required(),
				COOKIE_SECRET: Joi.string().required(),
				JWT_SECRET: Joi.string().required(),
				AWS_ACCESS_KEY: Joi.string().required(),
				AWS_SECRET_KEY: Joi.string().required(),
				AWS_S3_BUCKET: Joi.string().required(),
			})
		}),
		SequelizeModule.forRoot({
			dialect: 'mysql',
			host: process.env.DB_HOST,
			port: Number(process.env.DB_PORT),
			username: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_DATABASE,
			models: [User, Post, Category, CategoryPost],
			autoLoadModels: true
		}),
		UserModule, PostModule, PassportModule, AuthModule, CategoryModule
	]
})
export class AppModule {}
