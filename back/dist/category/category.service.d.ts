import { Category } from './category.model';
import { Post } from '../post/post.model';
import { Transaction } from 'sequelize';
import { CategoryPost } from './categoryPost.model';
import { CategoryDTO } from 'src/types/payload';
import { User } from 'src/user/user.model';
export declare class CategoryService {
    private categoryModel;
    private postModel;
    private categoryPostModel;
    private userModel;
    constructor(categoryModel: typeof Category, postModel: typeof Post, categoryPostModel: typeof CategoryPost, userModel: typeof User);
    getAllCategory(user: any): Promise<{}>;
    destroyCategoryPosts(where: any, t: Transaction): void;
    getCategoryPostIds(category: any): Promise<number[]>;
    removeCategoryPosts(where: any, t: Transaction): Promise<number>;
    createCategoryPostsExistingCategory(categoryArray: CategoryDTO[], PostId: number, t: Transaction): Promise<CategoryDTO[]>;
    bulkCreateCategory(categoryArray: CategoryDTO[], t: Transaction): Promise<unknown>;
    getLinkedPostsWithCategory(categoryIds: number[]): Promise<Category[]>;
}
