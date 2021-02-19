import { Column, BelongsToMany, Model, Table } from 'sequelize-typescript';
import { CategoryDTO } from 'src/types/payload';
import { Post } from './post.model';
import {CategoryPost} from './categoryPost.model'

@Table
export class Category extends Model<CategoryDTO> {
	@Column
	name: string;

	@BelongsToMany(() => Post, () => CategoryPost)
	posts: Post[];
}
