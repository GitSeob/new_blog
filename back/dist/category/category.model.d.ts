import { Model } from 'sequelize-typescript';
import { CategoryDTO } from 'src/types/payload';
import { Post } from '../post/post.model';
import { CategoryPost } from './categoryPost.model';
export declare class Category extends Model<CategoryDTO> {
    name: string;
    posts: Post[];
    categoryPosts: CategoryPost[];
}
