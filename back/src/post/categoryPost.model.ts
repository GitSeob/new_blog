import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { CategoryPostDTO } from 'src/types/payload';
import { Category } from './category.model';
import { Post } from './post.model';

@Table
export class CategoryPost extends Model<CategoryPostDTO> {
	@Column
	name: string;

	@ForeignKey(() => Post)
	@Column
	PostId: number;

	@ForeignKey(() => Category)
	@Column
	CategoryId: number;
}
