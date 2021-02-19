import { Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PostDTO } from 'src/types/payload';
import {PostService} from './post.service';

@Controller('/post')
export class PostController {
	constructor(private readonly postService:PostService){};

	@Get()
	getAllPost(@Query() query): PostDTO[] {
		console.log(query);
		return this.postService.getAllPost();
	}

	@Get('/:id')
	getPost(@Param('id') id: number): PostDTO {
		return this.postService.getPost(id);
	}

	@Post('/:id')
	postPost(@Param('id') id: number): string {
		return 'write post router'
	}

	@Patch('/:id')
	patchPost(@Param('id') id: number): string {
		return 'patch post router'
	}
}
