import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
	@Column(DataType.STRING(50))
	username: string;

	@Column(DataType.STRING(100))
	password: string;
}
