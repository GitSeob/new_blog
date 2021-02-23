import { Column, Model, Table, BelongsToMany, AllowNull, HasMany, DataType } from 'sequelize-typescript';
import { PostDTO } from 'src/types/payload';
import { Category } from './category.model';
import {CategoryPost} from './categoryPost.model'

@Table
export class Post extends Model<PostDTO> {
	@AllowNull(false)
	@Column
	title: string;

	@Column
	description: string;

	@Column
	thumbnail: string;

	@AllowNull(false)
	@Column(DataType.TEXT)
	body: string;

	@AllowNull(false)
	@Column
	is_visible: boolean;

	@BelongsToMany(() => Category, () => CategoryPost)
	categories: Category[]

	@HasMany(() => CategoryPost)
	categoryPosts: CategoryPost[]
}
