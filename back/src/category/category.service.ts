import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './category.model';
import { Post } from '../post/post.model';
import { fn, col, Transaction } from 'sequelize';
import { CategoryPost } from './categoryPost.model';
import { CategoryDTO } from 'src/types/payload';
import { User } from 'src/user/user.model';

@Injectable()
export class CategoryService {
	constructor(
		@InjectModel(Category)
		private categoryModel: typeof Category,
		@InjectModel(Post)
		private postModel: typeof Post,
		@InjectModel(CategoryPost)
		private categoryPostModel: typeof CategoryPost,
		@InjectModel(User)
		private userModel: typeof User,
	) {}

	async getAllCategory(user) {
		const result = {};
		const where = {}

		if (!user && !(await this.userModel.findOne({ where: { username: user }})))
			where['is_visible'] = true;
		result['categories'] = await this.categoryModel.findAll({
			attributes: ["id", "name", [fn('COUNT', col('categoryPosts.name')), 'postCount']],
			include: [{
				model: this.categoryPostModel,
				as: "categoryPosts",
				attributes: ['PostId'],
				include: [{
					model: this.postModel,
					as: 'post',
					attributes: ['id'],
					where
				}]
			}],
			group: ['Category.name'],
		}).then((categories: any[]) => {
			return categories.filter(category => category.dataValues.postCount > 0);
		})
		result['numberOfPosts'] = await this.postModel.count({ where });
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
			const createList = [];
			await allCategories.filter((ac) => categoryArray.find((c) => c.name === ac.name))
				.forEach((cate) => {
					createList.push({PostId, CategoryId: cate.id, name: cate.name})
				});
			await this.categoryPostModel.bulkCreate(createList, { transaction: t });
			resolve(remainingCategories);
		});
	}

	bulkCreateCategory( categoryArray: CategoryDTO[], t: Transaction) {
		return new Promise(async (resolve, reject) => {
			resolve(await this.categoryModel.bulkCreate(categoryArray, { returning: true, transaction: t }));
		});
	}
}
