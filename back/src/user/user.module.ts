import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.model';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
	imports: [
		SequelizeModule.forFeature([User]),
		AuthModule
	],
	exports: [UserService],
	controllers: [UserController],
	providers: [UserService]
})
export class UserModule{}
