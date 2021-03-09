import { AxiosError } from 'axios';
import { IUser, IPost, ICategory } from './datas';

export interface IUserState {
	user: IUser | null;
	loginErrorReason: string;
}

export interface IPostState {
	post: IPost | null;
	writeSuccess: number;
	isEditedPost: boolean;
	isRemovedPost: boolean;
	loadErrorReason: string | null;
	writeErrorReason: string | null;
	removeErrorReason: string | null;
}

export interface IPostsState {
	Category: ICategory[] & { postCount: number }[];
	posts: IPost[];
	isLoaddingPosts: boolean;
	loadPostsErrorReason: string | null;
	EndOfPosts: boolean;
	numberOfPosts: number;
	findPostCount: number;
}

export interface RootReducerProps {
	post: IPostState;
	posts: IPostsState;
	user: IUserState;
}
