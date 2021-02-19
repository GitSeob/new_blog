import { Column, Model, Table, BelongsToMany } from 'sequelize-typescript';
import { PostDTO } from 'src/types/payload';
import { Category } from './category.model';
import {CategoryPost} from './categoryPost.model'

@Table
export class Post extends Model<PostDTO> {
	@Column
	title: string;

	@Column
	description: string;

	@Column
	thumbnail: string;

	@Column
	body: string;

	@Column
	is_visible: boolean;

	@BelongsToMany(() => Category, () => CategoryPost)
	categorys: Category[]
}
