import { Controller, Get, Post, UseGuards, Request, Res } from '@nestjs/common';
import { Response } from 'express'
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('/user')
export class UserController {
	constructor(private authService: AuthService){};

	@UseGuards(JwtAuthGuard)
	@Get()
	getProfile(@Request() req) {
		return req.user;
	}

	@UseGuards(LocalAuthGuard)
	@Post()
	async login(@Request() req, @Res({ passthrough: true}) response: Response) {
		const access_token = await (await this.authService.login(req.user)).access_token;
		await response.cookie('Authorization', access_token);
		return req.user;
	}
}
