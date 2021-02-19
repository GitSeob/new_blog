export class PostDTO {
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

export class UserDTO {
	id?: number;
	username: string;
	password?: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}

export class CategoryDTO {
	id?: number;
	name: string;
	count?: number;
}

export class CategoryPostDTO {
	id?: number;
	PostId: number;
	CategoryId: number;
	name: string;
}
