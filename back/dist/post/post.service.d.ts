import { Sequelize } from 'sequelize-typescript';
import { PostIncludeCategoryDTO, PostDTO, WritePostDTO, LoadPostPageDTO } from 'src/types/payload';
import { CategoryPost } from '../category/categoryPost.model';
import { Post } from './post.model';
import { WhereOptions } from 'sequelize';
import { S3Service } from './s3.service';
import { CategoryService } from 'src/category/category.service';
import { User } from '../user/user.model';
export declare class PostService {
    private s3Service;
    private sequelize;
    private categoryService;
    private userModel;
    private postModel;
    private categoryPostModel;
    constructor(s3Service: S3Service, sequelize: Sequelize, categoryService: CategoryService, userModel: typeof User, postModel: typeof Post, categoryPostModel: typeof CategoryPost);
    upload: any;
    fileUpload(req: any, res: any): Promise<any>;
    getPostsWithCategoryPosts(where: WhereOptions<any>): Promise<Post[]>;
    getAllPostForSitemap(): Promise<Post[]>;
    getAllPost(username: string | null, category?: string, lastId?: string): Promise<PostDTO[]>;
    getSearchPosts(username: string | null, search?: string, lastId?: string): Promise<{
        posts: Post[];
        findPostCount: number;
    }>;
    getViewPost(where: WhereOptions<any>, username?: string | null): Promise<LoadPostPageDTO>;
    getPost(id: number): Promise<PostIncludeCategoryDTO>;
    writePost(body: WritePostDTO): Promise<PostDTO | null>;
    patchPost(PostId: number, body: WritePostDTO): Promise<PostIncludeCategoryDTO>;
    removePost(id: number): Promise<string>;
}
