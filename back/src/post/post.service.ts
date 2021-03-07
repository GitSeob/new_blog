import { Injectable, Req, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { PostIncludeCategoryDTO, PostDTO, WritePostDTO } from 'src/types/payload';
import { CategoryPost } from '../category/categoryPost.model';
import { Post } from './post.model';
import { Op, WhereOptions } from 'sequelize';
import { S3Service } from './s3.service';
import * as multer from 'multer';
import { CategoryService } from 'src/category/category.service';
import { User } from '../user/user.model';

@Injectable()
export class PostService {
	constructor(
		private s3Service: S3Service,
		private sequelize: Sequelize,
		private categoryService: CategoryService,
		@InjectModel(User)
		private userModel: typeof User,
		@InjectModel(Post)
		private postModel: typeof Post,
		@InjectModel(CategoryPost)
		private categoryPostModel: typeof CategoryPost,
	){}

	upload = multer(this.s3Service.createMulterOptions()).single('image', 1);

	async fileUpload(@Req() req, @Res() res) {
		try {
			this.upload(req, res, function(error) {
				if (error) {
					console.error(error);
					return res.status(404).json(`Failed to upload image file: ${error}`);
				}
				return res.json(req.file.location);
			})
		} catch (error) {
			console.error(error);
			return res.status(500).json(`Failed to upload image file: ${error}`);
		}
	}

	getPostsWithCategoryPosts(where: WhereOptions<any>) {
		return this.postModel.findAll({
			where,
			limit: 8,
			include: {
				model: this.categoryPostModel,
				as: 'categoryPosts',
				attributes: ["name"],
			},
			order: [['createdAt', 'DESC']],
		});
	}

	async getAllPost(username: string | null, category?: string, lastId?: string): Promise<PostDTO[]> {
		const where = {};

		if (!username || !(await this.userModel.findOne({ where: { username } })))
			where['is_visible'] = 1;
		if (parseInt(lastId, 10))
			where['id'] = {[Op.lt]: parseInt(lastId, 10)};
		if (category !== '0') {
			const postsIds = await this.categoryService.getCategoryPostIds(category);
			if (where['id']) {
				where['id'] = {
					[Op.and]: {
						...where['id'],
						postsIds,
					}
				}
			}
			else {
				where['id'] = postsIds;
			}
		}
		return await this.getPostsWithCategoryPosts(where);
	}

	async getSearchPosts(username: string | null, search?: string, lastId?: string) {
		let where = {};

		if (parseInt(lastId, 10))
			where['id'] = {[Op.lt]: parseInt(lastId, 10)};
		const postsIds = await this.categoryService.getCategoryPostIds({ [Op.like]: "%" + search + "%" });
		if (where['id']) {
			where = {
				[Op.and]: {
					id: where['id'],
					[Op.or]: {
						id: postsIds,
						title: { [Op.like]: "%" + search + "%" },
						body: { [Op.like]: "%" + search + "%" }
					}
				}
			}
		} else {
			where = {
				[Op.or]: {
					id: postsIds,
					title: { [Op.like]: "%" + search + "%" },
					body: { [Op.like]: "%" + search + "%" }
				}
			}
		}
		if (!username || !(await this.userModel.findOne({ where: { username } })))
			where['is_visible'] = true;
		const posts = await this.getPostsWithCategoryPosts(where);
		return {posts, findPostCount: await this.postModel.count({ where })};
	}

	async getViewPost(where: WhereOptions<any>, username: string | null = null): Promise<PostIncludeCategoryDTO> {
		if (!username || !(await this.userModel.findOne({ where: { username } })))
			where['is_visible'] = true;
		return await this.postModel.findOne({
			where,
			include: {
				model: this.categoryPostModel,
				as: 'categoryPosts',
				attributes: ["id", "name", "CategoryId"],
			}
		});
	}

	async getPost(id: number): Promise<PostIncludeCategoryDTO> {
		return await this.postModel.findOne({
			where: { id },
			include: {
				model: this.categoryPostModel,
				as: 'categoryPosts',
				attributes: ["id", "name", "CategoryId"],
			}
		});
	}

	async writePost(body: WritePostDTO): Promise<PostDTO | null> {
		const t = await this.sequelize.transaction();
		try {
			let newPost;

			newPost = await this.postModel.create({
				...body.post
			}, { transaction: t});
			const remainingCategories = await this.categoryService.createCategoryPostsExistingCategory(body.category, newPost.id, t)
			let createdCategories:any = await this.categoryService.bulkCreateCategory(remainingCategories, t);
			createdCategories = await createdCategories.map((category) => { return { PostId: newPost.id, CategoryId: category.id, name: category.name }});
			await this.categoryPostModel.bulkCreate(createdCategories, {transaction: t});
			await t.commit();
			return newPost;
		} catch (error) {
			console.error(error);
			await t.rollback();
			throw new Error(`Post creation failed for some reason.`);
		}
	}

	async patchPost(PostId: number, body: WritePostDTO) {
		const { post:editData, category } = body;

		if (!editData.thumbnail)
			editData.thumbnail = null;
		const prevPost = await this.getPost(PostId);
		if (!prevPost)
			return null;
		const t = await this.sequelize.transaction();
		try {
			await this.categoryService.destroyCategoryPosts({ PostId }, t);
			const remainingCategories = await this.categoryService.createCategoryPostsExistingCategory(category, PostId, t)
			let createdCategories:any = await this.categoryService.bulkCreateCategory(remainingCategories, t);
			createdCategories = await createdCategories.map((category) => { return { PostId, CategoryId: category.id, name: category.name }});
			await this.categoryPostModel.bulkCreate(createdCategories, {transaction: t});
			await this.postModel.update(editData,{
				where: {id: PostId },
				transaction: t
			});
			await t.commit();
		} catch (error) {
			console.error(error);
			await t.rollback();
			throw new Error(`Post modification failed for some reason.`);
		}
		return await this.getPost(PostId);
	}

	async removePost(id: number) {
		const prevPost = await this.getPost(id);

		if (!prevPost)
			return ;
		try {
			await this.sequelize.transaction(async (t) => {
				await this.categoryService.removeCategoryPosts({ id: prevPost.categoryPosts.map((c) => c.id) }, t)

				await this.postModel.destroy({
					where: { id },
					transaction: t
				});
			});
		} catch (error) {
			console.error(error);
			throw new Error(`Post deletion failed for some reason.`);
		}
		return 'success remove post';
	}
}
