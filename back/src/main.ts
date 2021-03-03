import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(
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

	if (process.env.NODE_ENV !== 'dev')
		sessionOptions.cookie['secure'] = true;

	await app.enableCors({
		origin: true,
		credentials: true,
	});
	await app.use(cookieParser(process.env.COOKIE_SECRET));
	await app.use(session(sessionOptions));
	await app.use(passport.initialize());
	await app.use(passport.session());
	await app.listen(process.env.PORT || 3075);
}

bootstrap();
