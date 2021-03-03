export interface ICategory {
	id: number;
	name: string;
	postCount?: number;
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
	categoryPosts: ICategory[];
	is_visible?: boolean;
	isEdited?: boolean;
}

export interface IUser {
	id: number;
	username: string;
	password?: string;
}
