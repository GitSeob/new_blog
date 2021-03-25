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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryPost = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const category_model_1 = require("./category.model");
const post_model_1 = require("../post/post.model");
let CategoryPost = class CategoryPost extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], CategoryPost.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.STRING(100)),
    __metadata("design:type", String)
], CategoryPost.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => post_model_1.Post),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], CategoryPost.prototype, "PostId", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => category_model_1.Category),
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], CategoryPost.prototype, "CategoryId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => post_model_1.Post),
    __metadata("design:type", post_model_1.Post)
], CategoryPost.prototype, "post", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => category_model_1.Category),
    __metadata("design:type", category_model_1.Category)
], CategoryPost.prototype, "category", void 0);
CategoryPost = __decorate([
    sequelize_typescript_1.Table
], CategoryPost);
exports.CategoryPost = CategoryPost;
//# sourceMappingURL=categoryPost.model.js.map