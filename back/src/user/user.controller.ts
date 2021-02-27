import { Controller, Get, Post, UseGuards, Request, Res, Session } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('/user')
export class UserController {
	constructor(private authService: AuthService){};

	@UseGuards(JwtAuthGuard)
	@Get()
	async getProfile(@Request() req) {
		return req.user;
	}

	@UseGuards(LocalAuthGuard)
	@Post()
	async login(@Session() session, @Request() req, @Res({ passthrough: true}) response) {
		const access_token = await (await this.authService.login(req.user)).access_token;
		await response.cookie('Authorization', access_token);
		session.cookie['user'] = req.user.username;
		return req.user;
	}
}
