import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { fn, col } from 'sequelize';
import { PostIncludeCategoryDTO, PostDTO, WritePostDTO } from 'src/types/payload';
import { Category } from './category.model';
import { CategoryPost } from './categoryPost.model';
import { Post } from './post.model';

@Injectable()
export class PostService {
	constructor(
		@InjectModel(Post)
		private postModel: typeof Post,
		@InjectModel(Category)
		private categoryModel: typeof Category,
		@InjectModel(CategoryPost)
		private categoryPostModel: typeof CategoryPost,
		private sequelize: Sequelize,
	){}

	async getAllPost(category?: string, search?: string): Promise<PostDTO[]> {
		return await this.postModel.findAll({
			include: {
				model: this.categoryPostModel,
				as: 'categoryPosts',
				attributes: ["name"],
			}
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
		const result =  await this.categoryModel.findAll({
			attributes: ["id", "name", [fn('COUNT', col('categoryPosts.name')), 'postCount']],
			include: [{
				model: this.categoryPostModel,
				as: "categoryPosts",
				attributes: ['id', 'name']
			}],
			group: ['Category.name'],
			//order: [['postCount', 'DSEC']]
		})
		//console.log(result);
		return result;
	}
}
