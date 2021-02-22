import { Injectable, Req, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { fn, col } from 'sequelize';
import { PostIncludeCategoryDTO, PostDTO, WritePostDTO } from 'src/types/payload';
import { Category } from './category.model';
import { CategoryPost } from './categoryPost.model';
import { Post } from './post.model';
import { Op } from 'sequelize';
import { S3Service } from './s3.service';
import * as multer from 'multer';

@Injectable()
export class PostService {
	constructor(
		@InjectModel(Post)
		private postModel: typeof Post,
		@InjectModel(Category)
		private categoryModel: typeof Category,
		@InjectModel(CategoryPost)
		private categoryPostModel: typeof CategoryPost,
		private s3Service: S3Service,
		private sequelize: Sequelize,
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

	async getAllPost(category?: string, lastId?: string): Promise<PostDTO[]> {
		const where = {};

		if (parseInt(lastId, 10))
			where['id'] = {[Op.lt]: parseInt(lastId, 10)};

		if (category !== 'undefined') {
			const postsIds = await this.categoryPostModel.findAll({
				where: {name: category}
			}).then(categories => categories.map(category => category.PostId));

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
		return await this.postModel.findAll({
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

	async getSearchPosts(search?: string, lastId?: string) {
		let where = {};

		if (parseInt(lastId, 10))
			where['id'] = {[Op.lt]: parseInt(lastId, 10)};

		const postsIds = await this.categoryPostModel.findAll({
			where: {
				name: {
					[Op.like]: "%" + search + "%"
				}
			}
		}).then(categories => categories.map(category => category.PostId));

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
		}
		else {
			where = {
				[Op.or]: {
					id: postsIds,
					title: { [Op.like]: "%" + search + "%" },
					body: { [Op.like]: "%" + search + "%" }
				}
			}
		}
		return await this.postModel.findAll({
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

	async getPost(id: number): Promise<PostIncludeCategoryDTO> {
		return this.postModel.findOne({
			where: {id: id},
			include: {
				model: this.categoryPostModel,
				as: 'categoryPosts',
				attributes: ["name"],
			}
		});
	}

	async writePost(body: WritePostDTO): Promise<PostDTO | null> {
		let newPost = null;
		try {
			await this.sequelize.transaction(async t => {
				const transactionHost = {transaction : t};

				newPost = await this.postModel.create({
					...body.post
				}, transactionHost);

				const newCategory = await this.categoryModel.bulkCreate(body.category, transactionHost).then(async (newCates) => {
					await newCates.forEach(cate => {
						this.categoryPostModel.create({
							PostId: newPost.id,
							CategoryId: cate.id,
							name: cate.name,
						})
					});
				});

				console.log(newCategory);
			});
		} catch (error) {
			console.error(error);
		}
		return newPost;
	}

	async getAllCategory() {
		const result = {};
		result['categories'] = await this.categoryModel.findAll({
			attributes: ["id", "name", [fn('COUNT', col('categoryPosts.name')), 'postCount']],
			include: [{
				model: this.categoryPostModel,
				as: "categoryPosts",
				attributes: ['id', 'name']
			}],
			group: ['Category.name'],
		})
		result['numberOfPosts'] = await this.postModel.count();
		return result;
	}
}
