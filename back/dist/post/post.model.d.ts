import { Model } from 'sequelize-typescript';
import { Category } from '../category/category.model';
import { CategoryPost } from '../category/categoryPost.model';
export declare class Post extends Model {
    title: string;
    description: string;
    thumbnail: string;
    body: string;
    is_visible: boolean;
    categories: Category[];
    categoryPosts: CategoryPost[];
}
