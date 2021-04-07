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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const payload_1 = require("../types/payload");
const categoryPost_model_1 = require("../category/categoryPost.model");
const post_model_1 = require("./post.model");
const sequelize_2 = require("sequelize");
const s3_service_1 = require("./s3.service");
const multer = require("multer");
const category_service_1 = require("../category/category.service");
const user_model_1 = require("../user/user.model");
const category_model_1 = require("../category/category.model");
let PostService = class PostService {
    constructor(s3Service, sequelize, categoryService, userModel, postModel, categoryPostModel) {
        this.s3Service = s3Service;
        this.sequelize = sequelize;
        this.categoryService = categoryService;
        this.userModel = userModel;
        this.postModel = postModel;
        this.categoryPostModel = categoryPostModel;
        this.upload = multer(this.s3Service.createMulterOptions()).single('image', 1);
    }
    async fileUpload(req, res) {
        try {
            this.upload(req, res, function (error) {
                if (error) {
                    console.error(error);
                    return res.status(404).json(`Failed to upload image file: ${error}`);
                }
                return res.json(req.file.location);
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json(`Failed to upload image file: ${error}`);
        }
    }
    getPostsWithCategoryPosts(where) {
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
    getAllPostForSitemap() {
        return this.postModel.findAll({ attributes: ["id"] });
    }
    async getAllPost(username, category, lastId) {
        const where = {};
        if (!username || !(await this.userModel.findOne({ where: { username } })))
            where['is_visible'] = 1;
        if (parseInt(lastId, 10))
            where['id'] = { [sequelize_2.Op.lt]: parseInt(lastId, 10) };
        if (category !== '0') {
            const postIds = await this.categoryService.getCategoryPostIds(category);
            if (where['id']) {
                where['id'] = {
                    [sequelize_2.Op.and]: Object.assign(Object.assign({}, where['id']), { [sequelize_2.Op.in]: postIds })
                };
            }
            else {
                where['id'] = postIds;
            }
        }
        return await this.getPostsWithCategoryPosts(where);
    }
    async getSearchPosts(username, search, lastId) {
        let where = {};
        if (parseInt(lastId, 10))
            where['id'] = { [sequelize_2.Op.lt]: parseInt(lastId, 10) };
        const postsIds = await this.categoryService.getCategoryPostIds({ [sequelize_2.Op.like]: "%" + search + "%" });
        const searchWhere = {
            [sequelize_2.Op.or]: {
                id: postsIds,
                title: { [sequelize_2.Op.like]: "%" + search + "%" },
                body: { [sequelize_2.Op.like]: "%" + search + "%" }
            }
        };
        if (where['id']) {
            where = {
                [sequelize_2.Op.and]: Object.assign({ id: where['id'] }, searchWhere)
            };
        }
        else {
            where = Object.assign({}, searchWhere);
        }
        if (!username || !(await this.userModel.findOne({ where: { username } })))
            where['is_visible'] = true;
        const posts = await this.getPostsWithCategoryPosts(where);
        return { posts, findPostCount: await this.postModel.count({ where: searchWhere }) };
    }
    async getViewPost(where, username = null) {
        if (!username || !(await this.userModel.findOne({ where: { username } })))
            where['is_visible'] = true;
        const post = await this.postModel.findOne({
            where,
            include: {
                model: this.categoryPostModel,
                as: 'categoryPosts',
                attributes: ["id", "name", "CategoryId"],
            }
        });
        const categoryIds = post.categoryPosts.map(c => c.CategoryId);
        return { post, categoryPosts: await this.categoryService.getLinkedPostsWithCategory(categoryIds) };
    }
    async getPost(id) {
        return await this.postModel.findOne({
            where: { id },
            include: {
                model: this.categoryPostModel,
                as: 'categoryPosts',
                attributes: ["id", "name", "CategoryId"],
            }
        });
    }
    async writePost(body) {
        const t = await this.sequelize.transaction();
        try {
            let newPost;
            newPost = await this.postModel.create(Object.assign({}, body.post), { transaction: t });
            const remainingCategories = await this.categoryService.createCategoryPostsExistingCategory(body.category, newPost.id, t);
            let createdCategories = await this.categoryService.bulkCreateCategory(remainingCategories, t);
            createdCategories = await createdCategories.map((category) => { return { PostId: newPost.id, CategoryId: category.id, name: category.name }; });
            await this.categoryPostModel.bulkCreate(createdCategories, { transaction: t });
            await t.commit();
            return newPost;
        }
        catch (error) {
            console.error(error);
            await t.rollback();
            throw new Error(`Post creation failed for some reason.`);
        }
    }
    async patchPost(PostId, body) {
        const { post: editData, category } = body;
        if (!editData.thumbnail)
            editData.thumbnail = null;
        const prevPost = await this.getPost(PostId);
        if (!prevPost)
            return null;
        const t = await this.sequelize.transaction();
        try {
            await this.categoryService.destroyCategoryPosts({ PostId }, t);
            const remainingCategories = await this.categoryService.createCategoryPostsExistingCategory(category, PostId, t);
            let createdCategories = await this.categoryService.bulkCreateCategory(remainingCategories, t);
            createdCategories = await createdCategories.map((category) => { return { PostId, CategoryId: category.id, name: category.name }; });
            await this.categoryPostModel.bulkCreate(createdCategories, { transaction: t });
            await this.postModel.update(editData, {
                where: { id: PostId },
                transaction: t
            });
            await t.commit();
        }
        catch (error) {
            console.error(error);
            await t.rollback();
            throw new Error(`Post modification failed for some reason.`);
        }
        return await this.getPost(PostId);
    }
    async removePost(id) {
        const prevPost = await this.getPost(id);
        if (!prevPost)
            return;
        try {
            await this.sequelize.transaction(async (t) => {
                await this.categoryService.removeCategoryPosts({ id: prevPost.categoryPosts.map((c) => c.id) }, t);
                await this.postModel.destroy({
                    where: { id },
                    transaction: t
                });
            });
        }
        catch (error) {
            console.error(error);
            throw new Error(`Post deletion failed for some reason.`);
        }
        return 'success remove post';
    }
};
__decorate([
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostService.prototype, "fileUpload", null);
PostService = __decorate([
    common_1.Injectable(),
    __param(3, sequelize_1.InjectModel(user_model_1.User)),
    __param(4, sequelize_1.InjectModel(post_model_1.Post)),
    __param(5, sequelize_1.InjectModel(categoryPost_model_1.CategoryPost)),
    __metadata("design:paramtypes", [s3_service_1.S3Service,
        sequelize_typescript_1.Sequelize,
        category_service_1.CategoryService, Object, Object, Object])
], PostService);
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map