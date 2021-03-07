import { NestFactory } from '@nestjs/core';
import * as express from 'express'
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(
		AppModule
	);
	const sessionOptions = {
		secret: process.env.COOKIE_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: {
			httpOnly: true,
		}
	};

	app.set('trust proxy', 1);

	if (process.env.NODE_ENV === 'production') {
		sessionOptions.cookie['secure'] = true;
	}
	await app.enableCors({
		origin: true,
		credentials: true,
	});
	await app.use(express.json());
	await app.use(express.urlencoded({ extended: true }));
	await app.use(cookieParser(process.env.COOKIE_SECRET));
	await app.use(session(sessionOptions));
	await app.use(passport.initialize());
	await app.use(passport.session());
	await app.listen(process.env.PORT || 3075);
}

bootstrap();
