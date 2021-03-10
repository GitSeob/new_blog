import { Controller, Get, Param, Patch, Post, Query, Body, Req, Res, UseGuards, Delete, Request } from '@nestjs/common';
import { LoadPostPageDTO, PostDTO, PostIncludeCategoryDTO } from 'src/types/payload';
import {PostService} from './post.service';
import { JwtAuthGuard, JwtAuthSemiGuard } from '../auth/jwt-auth.guard';


@Controller('/post')
export class PostController {
	constructor(private readonly postService:PostService){};

	@Get()
	@UseGuards(JwtAuthSemiGuard)
	getAllPost(@Query() query, @Request() req) {
		return this.postService.getAllPost(req.user?.username || null, decodeURIComponent(query.category), query.lastId);
	}

	@Get('/search')
	@UseGuards(JwtAuthSemiGuard)
	getSearchPosts(@Query() query, @Request() req) {
		return this.postService.getSearchPosts(req.user?.username || null, decodeURIComponent(query.search), query.lastId);
	}

	@Post('/')
	@UseGuards(JwtAuthGuard)
	postPost(@Body() body):Promise<PostDTO | null > {
		return this.postService.writePost(body);
	}

	@Get('/:id')
	@UseGuards(JwtAuthSemiGuard)
	getPost(@Param('id') id: number, @Request() req): Promise<LoadPostPageDTO> {
		const where = { id };
		return this.postService.getViewPost(where, req.user?.username || null);
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
