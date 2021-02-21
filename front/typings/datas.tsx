import { AxiosError } from 'axios';

export interface ICategory {
	id: number;
	name: string;
	postCount?: number;
}

export interface ICategoryHead {
	id: number;
	name: string;
	postCount: number;
}

export interface actionProps {
	type?: any;
	data?: any;
	payload?: any;
}

export interface reducerProps {
	state: any;
	action: any | actionProps;
}

export interface ILogin {
	username: string;
	password: string;
}

export interface IPost {
	id: number;
	title: string;
	thumbnail: string;
	description: string;
	createdAt?: string;
	body: string;
	Category: ICategory[];
	is_visible?: boolean;
}

export interface IUser {
	id: number;
	username: string;
	password?: string;
}

export interface IUserState {
	user: IUser | null;
	isLoggedIn: boolean;
	isLoggingIn: boolean;
	isLoggingOut: boolean;
	loginErrorReason: string;
}

export interface IPostState {
	post: IPost | null;
	writeSuccess: number;
	isLoadingPost: boolean;
	isWritingPost: boolean;
	isRemovingPost: boolean;
	loadErrorReason: AxiosError | null;
	writeErrorReason: AxiosError | null;
	removeErrorReason: AxiosError | null;
}

export interface IPostsState {
	Category: ICategoryHead[];
	posts: IPost[];
	isLoaddingPosts: boolean;
	isLoadedPosts: boolean;
	loadPostsErrorReason: AxiosError | null;
	EndOfPosts: boolean;
	numberOfPosts: number;
}

export interface RootReducerProps {
	post: IPostState;
	posts: IPostsState;
	user: IUserState;
}
