export declare class PostDTO {
    id?: number;
    title: string;
    description: string;
    thumbnail: string;
    body: string;
    is_visible: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export declare class PostIncludeCategoryDTO {
    id?: number;
    title: string;
    description: string;
    thumbnail: string;
    body: string;
    is_visible: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    categoryPosts: CategoryPostDTO[];
}
export declare class UserDTO {
    id?: number;
    username: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export declare class CategoryDTO {
    id?: number;
    name: string;
    count?: number;
}
export declare class CategoryPostDTO {
    id?: number;
    PostId?: number;
    CategoryId?: number;
    name: string;
}
export declare class WritePostDTO {
    post: PostDTO;
    category: CategoryPostDTO[];
}
export declare class LoadPostPageDTO {
    post: PostIncludeCategoryDTO;
    categoryPosts: any;
}
