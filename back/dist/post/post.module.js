"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const post_controller_1 = require("./post.controller");
const post_service_1 = require("./post.service");
const post_model_1 = require("./post.model");
const category_model_1 = require("../category/category.model");
const categoryPost_model_1 = require("../category/categoryPost.model");
const platform_express_1 = require("@nestjs/platform-express");
const s3_service_1 = require("./s3.service");
const category_service_1 = require("../category/category.service");
const user_model_1 = require("../user/user.model");
let PostModule = class PostModule {
};
PostModule = __decorate([
    common_1.Module({
        imports: [
            platform_express_1.MulterModule.registerAsync({
                useClass: s3_service_1.S3Service
            }),
            sequelize_1.SequelizeModule.forFeature([post_model_1.Post, category_model_1.Category, categoryPost_model_1.CategoryPost, user_model_1.User]),
        ],
        controllers: [post_controller_1.PostController],
        providers: [s3_service_1.S3Service, category_service_1.CategoryService, post_service_1.PostService],
    })
], PostModule);
exports.PostModule = PostModule;
//# sourceMappingURL=post.module.js.map