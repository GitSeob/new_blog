"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const Joi = require("joi");
const sequelize_1 = require("@nestjs/sequelize");
const user_module_1 = require("./user/user.module");
const post_module_1 = require("./post/post.module");
const user_model_1 = require("./user/user.model");
const post_model_1 = require("./post/post.model");
const category_model_1 = require("./category/category.model");
const categoryPost_model_1 = require("./category/categoryPost.model");
const passport_1 = require("@nestjs/passport");
const auth_module_1 = require("./auth/auth.module");
const category_module_1 = require("./category/category.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                ignoreEnvFile: process.env.NODE_ENV === 'production',
                validationSchema: Joi.object({
                    NODE_ENV: Joi.string().valid('dev', 'development', 'production', 'test').required(),
                    DB_HOST: Joi.string().required(),
                    DB_PORT: Joi.string().required(),
                    DB_USERNAME: Joi.string().required(),
                    DB_PASSWORD: Joi.string().required(),
                    DB_DATABASE: Joi.string().required(),
                    COOKIE_SECRET: Joi.string().required(),
                    JWT_SECRET: Joi.string().required(),
                    AWS_ACCESS_KEY: Joi.string().required(),
                    AWS_SECRET_KEY: Joi.string().required(),
                    AWS_S3_BUCKET: Joi.string().required(),
                })
            }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'mysql',
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                models: [user_model_1.User, post_model_1.Post, category_model_1.Category, categoryPost_model_1.CategoryPost],
                autoLoadModels: true
            }),
            user_module_1.UserModule, post_module_1.PostModule, passport_1.PassportModule, auth_module_1.AuthModule, category_module_1.CategoryModule
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map