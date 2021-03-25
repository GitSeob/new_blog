import { Model } from 'sequelize-typescript';
import { Category } from './category.model';
import { Post } from '../post/post.model';
export declare class CategoryPost extends Model {
    id: number;
    name: string;
    PostId: number;
    CategoryId: number;
    post: Post;
    category: Category;
}
