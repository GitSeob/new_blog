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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const payload_1 = require("../types/payload");
const post_service_1 = require("./post.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    ;
    getAllPost(query, req) {
        var _a;
        return this.postService.getAllPost(((_a = req.user) === null || _a === void 0 ? void 0 : _a.username) || null, decodeURIComponent(query.category), query.lastId);
    }
    getSearchPosts(query, req) {
        var _a;
        return this.postService.getSearchPosts(((_a = req.user) === null || _a === void 0 ? void 0 : _a.username) || null, decodeURIComponent(query.search), query.lastId);
    }
    postPost(body) {
        return this.postService.writePost(body);
    }
    getAllPosts() {
        return this.postService.getAllPostForSitemap();
    }
    getPost(id, req) {
        var _a;
        const where = { id };
        return this.postService.getViewPost(where, ((_a = req.user) === null || _a === void 0 ? void 0 : _a.username) || null);
    }
    async patchPost(res, id, body) {
        const result = await this.postService.patchPost(id, body);
        if (!result)
            return res.status(404).json(`포스트를 찾을 수 없습니다.`);
        return res.json(result);
    }
    async deletePost(res, id) {
        const result = await this.postService.removePost(id);
        if (!result)
            return res.status(404).json(`포스트를 찾을 수 없습니다.`);
        return res.json(result);
    }
    async uploadImage(req, res) {
        try {
            await this.postService.fileUpload(req, res);
        }
        catch (error) {
            return res.status(500).json(`Failed to upload image file: ${error.message}`);
        }
    }
};
__decorate([
    common_1.Get(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthSemiGuard),
    __param(0, common_1.Query()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getAllPost", null);
__decorate([
    common_1.Get('/search'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthSemiGuard),
    __param(0, common_1.Query()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getSearchPosts", null);
__decorate([
    common_1.Post('/'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "postPost", null);
__decorate([
    common_1.Post('/getList'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getAllPosts", null);
__decorate([
    common_1.Get('/:id'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthSemiGuard),
    __param(0, common_1.Param('id')), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPost", null);
__decorate([
    common_1.Patch('/:id'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "patchPost", null);
__decorate([
    common_1.Delete('/:id'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Res()), __param(1, common_1.Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "deletePost", null);
__decorate([
    common_1.Post('/uploadImage'),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "uploadImage", null);
PostController = __decorate([
    common_1.Controller('/post'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map