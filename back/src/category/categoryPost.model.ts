import { Column, Model, Table, ForeignKey, AllowNull, BelongsTo, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';
import { Category } from './category.model';
import { Post } from '../post/post.model';

@Table
export class CategoryPost extends Model {
	@PrimaryKey
	@AutoIncrement
	@AllowNull(false)
	@Column(DataType.INTEGER)
	id: number;

	@AllowNull(false)
	@Column(DataType.STRING(100))
	name: string;

	@ForeignKey(() => Post)
	@Column(DataType.INTEGER)
	PostId: number;

	@ForeignKey(() => Category)
	@Column(DataType.INTEGER)
	CategoryId: number;

	@BelongsTo(() => Post)
	post: Post;

	@BelongsTo(() => Category)
	category: Category;
}
