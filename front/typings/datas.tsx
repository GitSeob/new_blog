export interface ICategory {
	id: number;
	name: string;
	num?: number;
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

export interface IPost {
	id: number;
	title: string;
	thumbnail: string;
	description: string;
	createAt: string;
	body: string;
	Category: ICategory[];
}

export interface IUser {
	id: number;
	username: string;
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
	isLoadingPost: boolean;
	isWritingPost: boolean;
	isRemovingPost: boolean;
	writeErrorReason: string;
	removeErrorReason: string;
}

export interface IPostsState {
	posts: IPost[] | [];
	isLoaddingPosts: boolean;
	isLoadedPosts: boolean;
	loadPostsErrorReason: string;
}

export interface RootReducerProps {
	post: IPostState;
	posts: IPostsState;
	user: IUserState;
}
