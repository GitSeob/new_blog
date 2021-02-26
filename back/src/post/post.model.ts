import { Column, Model, Table, BelongsToMany, AllowNull, HasMany, DataType } from 'sequelize-typescript';
import { PostDTO } from 'src/types/payload';
import { Category } from '../category/category.model';
import { CategoryPost } from '../category/categoryPost.model'

@Table
export class Post extends Model<PostDTO> {
	@AllowNull(false)
	@Column(DataType.STRING(40))
	title: string;

	@Column(DataType.STRING(160))
	description: string;

	@Column(DataType.TEXT)
	thumbnail: string;

	@AllowNull(false)
	@Column(DataType.TEXT)
	body: string;

	@AllowNull(false)
	@Column(DataType.BOOLEAN)
	is_visible: boolean;

	@BelongsToMany(() => Category, () => CategoryPost)
	categories: Category[]

	@HasMany(() => CategoryPost)
	categoryPosts: CategoryPost[]
}
