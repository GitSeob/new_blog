"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const category_model_1 = require("./category.model");
const post_model_1 = require("../post/post.model");
const sequelize_2 = require("sequelize");
const categoryPost_model_1 = require("./categoryPost.model");
const payload_1 = require("../types/payload");
const user_model_1 = require("../user/user.model");
let CategoryService = class CategoryService {
    constructor(categoryModel, postModel, categoryPostModel, userModel) {
        this.categoryModel = categoryModel;
        this.postModel = postModel;
        this.categoryPostModel = categoryPostModel;
        this.userModel = userModel;
    }
    async getAllCategory(user) {
        const result = {};
        const where = {};
        if (!user && !(await this.userModel.findOne({ where: { username: user } })))
            where['is_visible'] = true;
        result['categories'] = await this.categoryModel.findAll({
            attributes: ["id", "name", [sequelize_2.fn('COUNT', sequelize_2.col('categoryPosts.name')), 'postCount']],
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
        }).then((categories) => {
            return categories.filter(category => category.dataValues.postCount > 0);
        });
        result['numberOfPosts'] = await this.postModel.count({ where });
        return result;
    }
    destroyCategoryPosts(where, t) {
        this.categoryPostModel.destroy({
            where,
            transaction: t
        });
    }
    getCategoryPostIds(category) {
        return this.categoryPostModel.findAll({
            where: { name: category }
        }).then(categories => categories.map(category => category.PostId));
    }
    async removeCategoryPosts(where, t) {
        return await this.categoryPostModel.destroy({
            where, transaction: t
        });
    }
    async createCategoryPostsExistingCategory(categoryArray, PostId, t) {
        return new Promise(async (resolve, reject) => {
            const allCategories = await this.categoryModel.findAll();
            const remainingCategories = await categoryArray.filter((c) => (!allCategories.find((ac) => ac.name === c.name)));
            const createList = [];
            await allCategories.filter((ac) => categoryArray.find((c) => c.name === ac.name))
                .forEach((cate) => {
                createList.push({ PostId, CategoryId: cate.id, name: cate.name });
            });
            await this.categoryPostModel.bulkCreate(createList, { transaction: t });
            resolve(remainingCategories);
        });
    }
    bulkCreateCategory(categoryArray, t) {
        return new Promise(async (resolve, reject) => {
            resolve(await this.categoryModel.bulkCreate(categoryArray, { returning: true, transaction: t }));
        });
    }
    getLinkedPostsWithCategory(categoryIds) {
        return this.categoryModel.findAll({
            where: { id: categoryIds },
            attributes: ["name"],
            include: {
                model: this.postModel,
                attributes: ["id", "title", "createdAt"],
            },
            order: [[{ model: this.postModel, as: 'posts' }, 'createdAt', 'DESC']],
        });
    }
};
CategoryService = __decorate([
    common_1.Injectable(),
    __param(0, sequelize_1.InjectModel(category_model_1.Category)),
    __param(1, sequelize_1.InjectModel(post_model_1.Post)),
    __param(2, sequelize_1.InjectModel(categoryPost_model_1.CategoryPost)),
    __param(3, sequelize_1.InjectModel(user_model_1.User)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map