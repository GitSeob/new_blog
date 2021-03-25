import { LoadPostPageDTO, PostDTO } from 'src/types/payload';
import { PostService } from './post.service';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    getAllPost(query: any, req: any): Promise<PostDTO[]>;
    getSearchPosts(query: any, req: any): Promise<{
        posts: import("./post.model").Post[];
        findPostCount: number;
    }>;
    postPost(body: any): Promise<PostDTO | null>;
    getAllPosts(): Promise<import("./post.model").Post[]>;
    getPost(id: number, req: any): Promise<LoadPostPageDTO>;
    patchPost(res: any, id: number, body: any): Promise<any>;
    deletePost(res: any, id: number): Promise<any>;
    uploadImage(req: any, res: any): Promise<any>;
}
