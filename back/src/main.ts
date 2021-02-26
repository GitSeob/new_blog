import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	await app.enableCors({
		origin: true,
		credentials: true,
	});
	await app.use(cookieParser(process.env.COOKIE_SECRET));
	await app.listen(process.env.PORT || 3075);
}

bootstrap();
