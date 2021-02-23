import { Column, Model, Table, ForeignKey, AllowNull, BelongsTo, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { CategoryDTO } from 'src/types/payload';
import { Category } from './category.model';
import { Post } from './post.model';

@Table
export class CategoryPost extends Model {
	@PrimaryKey
	@AutoIncrement
	@AllowNull(false)
	@Column
	id: number;

	@AllowNull(false)
	@Column
	name: string;

	@ForeignKey(() => Post)
	@Column
	PostId: number;

	@ForeignKey(() => Category)
	@Column
	CategoryId: number;

	@BelongsTo(() => Post)
	post: Post;

	@BelongsTo(() => Category)
	category: Category;
}
