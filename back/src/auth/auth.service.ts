import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import {compare} from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	){}

	async validateUser(username: string, password: string): Promise<any> {
		const user = await this.userService.findOne(username);
		if (!user || (user && !compare(password, user.password)))
			return null;
		return await this.userService.findOneWithOutPassword(user.id);
	}

	async login(user: any) {
		const payload = { username: user.username, sub: user.id };
		return { access_token: this.jwtService.sign(payload) };
	}
}
