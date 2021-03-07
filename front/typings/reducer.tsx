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
	loadErrorReason: AxiosError | null;
	writeErrorReason: AxiosError | null;
	removeErrorReason: AxiosError | null;
}

export interface IPostsState {
	Category: ICategory[] & { postCount: number }[];
	posts: IPost[];
	isLoaddingPosts: boolean;
	loadPostsErrorReason: AxiosError | null;
	EndOfPosts: boolean;
	numberOfPosts: number;
	findPostCount: number;
}

export interface RootReducerProps {
	post: IPostState;
	posts: IPostsState;
	user: IUserState;
}
