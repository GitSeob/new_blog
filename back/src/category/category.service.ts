import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './category.model';
import { Post } from '../post/post.model';
import { fn, col, Transaction } from 'sequelize';
import { CategoryPost } from './categoryPost.model';
import { CategoryDTO } from 'src/types/payload';

@Injectable()
export class CategoryService {
	constructor(
		@InjectModel(Category)
		private categoryModel: typeof Category,
		@InjectModel(Post)
		private postModel: typeof Post,
		@InjectModel(CategoryPost)
		private categoryPostModel: typeof CategoryPost,
	) {}

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

	destroyCategoryPosts (where: any, t: Transaction) {
		this.categoryPostModel.destroy({
			where,
			transaction: t
		});
	}

	getCategoryPostIds(category: any) {
		return this.categoryPostModel.findAll({
			where: {name: category}
		}).then(categories => categories.map(category => category.PostId));
	}

	async removeCategoryPosts(where: any, t: Transaction) {
		return await this.categoryPostModel.destroy({
			where, transaction: t
		})
	}

	async createCategoryPostsExistingCategory( categoryArray: CategoryDTO[], PostId: number, t: Transaction ): Promise<CategoryDTO[]> {
		return new Promise(async (resolve, reject) => {
			const allCategories = await this.categoryModel.findAll();
			const remainingCategories = await categoryArray.filter((c) => (
				!allCategories.find((ac) => ac.name === c.name)
			));

			await allCategories.filter((ac) => categoryArray.find((c) => c.name === ac.name))
				.forEach((cate) => {
					this.categoryPostModel.create({
						PostId, CategoryId: cate.id, name: cate.name
					}, { transaction: t });
				});
			resolve(remainingCategories);
		});
	}

	async bulkCreateCategory( categoryArray: CategoryDTO[], t: Transaction) {
		return await this.categoryModel.bulkCreate(categoryArray, { returning: true, transaction: t })
	}
}
