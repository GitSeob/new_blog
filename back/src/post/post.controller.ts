import { Controller, Get, Param, Patch, Post, Query, Body, Req, Res, Put } from '@nestjs/common';
import { PostDTO, PostIncludeCategoryDTO } from 'src/types/payload';
import {PostService} from './post.service';

@Controller('/post')
export class PostController {
	constructor(private readonly postService:PostService){};

	@Get()
	getAllPost(@Query() query) {
		return this.postService.getAllPost(decodeURIComponent(query.category), query.lastId);
	}

	@Get('/search')
	getSearchPosts(@Query() query) {
		return this.postService.getSearchPosts(decodeURIComponent(query.search), query.lastId);
	}

	@Post('/')
	postPost(@Body() body):Promise<PostDTO | null > {
		return this.postService.writePost(body);
	}

	@Get('/:id')
	getPost(@Param('id') id: number): Promise<PostIncludeCategoryDTO> {
		return this.postService.getPost(id);
	}

	@Patch('/:id')
	patchPost(@Param('id') id: number): string {
		return 'patch post router'
	}

	@Post('/uploadImage')
	async uploadImage(@Req() req, @Res() res) {
		try {
			await this.postService.fileUpload(req, res);
		} catch (error) {
			return res.status(500).json(`Failed to upload image file: ${error.message}`);
		}
	}
}

@Controller('/category')
export class CategoryController {
	constructor(private readonly postService:PostService){};

	@Get()
	getAllCategory() {
		return this.postService.getAllCategory();
	}
}
