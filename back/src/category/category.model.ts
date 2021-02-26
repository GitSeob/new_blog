import { Column, BelongsToMany, Model, Table, AllowNull, HasMany, Unique, DataType } from 'sequelize-typescript';
import { CategoryDTO } from 'src/types/payload';
import { Post } from '../post/post.model';
import {CategoryPost} from './categoryPost.model'

@Table
export class Category extends Model<CategoryDTO> {
	@AllowNull(false)
	@Unique
	@Column(DataType.STRING(100))
	name: string;

	@BelongsToMany(() => Post, () => CategoryPost)
	posts: Post[];

	@HasMany(() => CategoryPost)
	categoryPosts: CategoryPost[]
}
