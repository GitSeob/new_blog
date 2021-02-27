import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User)
		private userModel: typeof User
	){}

	findOne(username: string): Promise<User | null> {
		const user = this.userModel.findOne({
			where: {username: username}
		})
		return user;
	}

	findOneWithOutPassword(id: number): Promise<User | null> {
		const user = this.userModel.findOne({
			where: {id},
			attributes: ['id', 'username']
		});
		return user;
	}
}
