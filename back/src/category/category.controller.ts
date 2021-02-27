import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthSemiGuard } from 'src/auth/jwt-auth.guard';
import { CategoryService } from './category.service';

@Controller('/category')
export class CategoryController {
	constructor(private readonly categoryService:CategoryService){};

	@Get()
	@UseGuards(JwtAuthSemiGuard)
	getAllCategory(@Request() req) {
		return this.categoryService.getAllCategory(req.user?.username || null);
	}
}
