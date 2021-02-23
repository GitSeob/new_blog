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
				attributes: ["id", "name", "CategoryId"],
			}
		});
	}

	async writePost(body: WritePostDTO): Promise<PostDTO | null> {
		try {
			let newPost;
			await this.sequelize.transaction(async t => {
				const transactionHost = {transaction : t};

				newPost = await this.postModel.create({
					...body.post
				}, transactionHost);

				await this.categoryModel.bulkCreate(body.category, transactionHost).then(async (newCates) => {
					await newCates.forEach(cate => {
						this.categoryPostModel.create({
							PostId: newPost.id,
							CategoryId: cate.id,
							name: cate.name,
						})
					});
				});
			});
			return newPost;
		} catch (error) {
			console.error(error);
			throw new Error(`Post creation failed for some reason.`);
		}
	}

	async patchPost(PostId: number, body: WritePostDTO) {
		const { post:editData, category } = body;

		const prevPost = await this.getPost(PostId);

		if (!prevPost)
			return null;

		const t = await this.sequelize.transaction();

		try {
			const allCategories = await this.categoryModel.findAll();
			const filteredCategory = category.filter((c) => (
				!allCategories.find((ac) => ac.name === c.name)
			));

			await allCategories.filter((ac) => category.find((c) => c.name === ac.name)).forEach((cate) => {
				this.categoryPostModel.create({
					PostId, CategoryId: cate.id, name: cate.name
				}, { transaction: t });
			})

			await this.categoryPostModel.destroy({
				where: { PostId },
				transaction: t
			});

			await this.categoryModel.bulkCreate(filteredCategory, { transaction: t })
				.then(async (newCates) => {
					await newCates.forEach(cate => {
						console.log(cate.id);
						this.categoryPostModel.create({
							PostId,
							CategoryId: cate.id,
							name: cate.name,
						}, {transaction: t});
					});
				});

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
				await this.categoryPostModel.destroy({
					where: {
						id: prevPost.categoryPosts.map((c) => c.id),
					},
					transaction: t
				})

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

	async getAllCategory() {
		const result = {};
		result['categories'] = await this.categoryModel.findAll({
			attributes: ["id", "name", [fn('COUNT', col('categoryPosts.name')), 'postCount']],
			include: [{
				model: this.categoryPostModel,
				as: "categoryPosts",
				attributes: []
			}],
			group: ['Category.name'],
		}).then((categories: any[]) => {
			return categories.filter(category => category.dataValues.postCount > 0);
		})

		result['numberOfPosts'] = await this.postModel.count();
		return result;
	}
}
