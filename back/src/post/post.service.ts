import { Injectable } from '@nestjs/common';
import { PostDTO } from 'src/types/payload';

@Injectable()
export class PostService {
	getAllPost(category?: string, search?: string): PostDTO[] {
		return [{
			id: 1,
			title: '블로그 제목',
			description: '블로그 description',
			thumbnail: 'https://image.fmkorea.com/files/attach/new/20210131/2063168106/2611943875/3361686768/99b983892094b5c6d2fc3736e15da7d1.jpeg',
			body: '',
			is_visible: true,
		}]
	}

	getPost(id: number): PostDTO {
		return {
			id: Number(id),
			title: '블로그 제목',
			description: '블로그 description',
			thumbnail: 'https://image.fmkorea.com/files/attach/new/20210131/2063168106/2611943875/3361686768/99b983892094b5c6d2fc3736e15da7d1.jpeg',
			body: '',
			is_visible: true,
		}
	}
}
