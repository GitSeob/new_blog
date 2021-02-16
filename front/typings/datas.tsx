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
