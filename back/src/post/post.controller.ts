import { Controller, Get, Param, Patch, Post, Query, Body, Req, Res, UseGuards, Delete } from '@nestjs/common';
import { PostDTO, PostIncludeCategoryDTO } from 'src/types/payload';
import {PostService} from './post.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


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
	@UseGuards(JwtAuthGuard)
	postPost(@Body() body):Promise<PostDTO | null > {
		return this.postService.writePost(body);
	}

	@Get('/:id')
	getPost(@Param('id') id: number): Promise<PostIncludeCategoryDTO> {
		return this.postService.getPost(id);
	}

	@Patch('/:id')
	@UseGuards(JwtAuthGuard)
	async patchPost(@Res() res, @Param('id') id: number, @Body() body) {
		const result = await this.postService.patchPost(id, body);
		if (!result)
			return res.status(404).json(`포스트를 찾을 수 없습니다.`);
		return res.json(result);
	}

	@Delete('/:id')
	@UseGuards(JwtAuthGuard)
	async deletePost(@Res() res, @Param('id') id: number) {
		const result = await this.postService.removePost(id);
		if (!result)
			return res.status(404).json(`포스트를 찾을 수 없습니다.`);
		return res.json(result);
	}

	@Post('/uploadImage')
	@UseGuards(JwtAuthGuard)
	async uploadImage(@Req() req, @Res() res) {
		try {
			await this.postService.fileUpload(req, res);
		} catch (error) {
			return res.status(500).json(`Failed to upload image file: ${error.message}`);
		}
	}
}
