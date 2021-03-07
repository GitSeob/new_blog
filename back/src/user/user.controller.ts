import { Controller, Get, Post, UseGuards, Request, Res } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';

@Controller('/user')
export class UserController {
	constructor(
		private authService: AuthService,
		private configService: ConfigService
	){};

	@UseGuards(JwtAuthGuard)
	@Get()
	async getProfile(@Request() req) {
		return req.user;
	}

	@UseGuards(LocalAuthGuard)
	@Post()
	async login(@Request() req, @Res({ passthrough: true}) res) {
		let options = {}
		if (this.configService.get('NODE_ENV') === 'production') {
			options = {
				sameSite: 'none',
				secure: true,
				httpOnly: false,
				domain: '.hsan.kr'
			};
		}
		const access_token = await (await this.authService.login(req.user)).access_token;
		await res.cookie('Authorization', access_token, options);
		return req.user;
	}
}
