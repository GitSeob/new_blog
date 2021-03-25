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
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const AWS = require("aws-sdk");
const MulterS3 = require("multer-s3");
let S3Service = class S3Service {
    constructor(configService) {
        this.configService = configService;
        this.FILE_LIMIT_SIZE = 1024 * 1024 * 10;
        this.s3 = new AWS.S3();
        AWS.config.update({
            accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
            secretAccessKey: this.configService.get('AWS_SECRET_KEY')
        });
    }
    ;
    createMulterOptions() {
        const bucket = this.configService.get('AWS_S3_BUCKET');
        const acl = 'public-read';
        const multerS3Storage = MulterS3({
            s3: this.s3,
            bucket,
            acl,
            metadata: (req, file, cb) => {
                cb(null, { fieldName: file.fieldname });
            },
            key: (req, file, cb) => {
                const nowDate = Date.now();
                cb(null, `images/${nowDate}-${file.originalname}`);
            },
        });
        return {
            storage: multerS3Storage,
            fileFilter: this.fileFilter,
            limits: {
                fileSize: this.FILE_LIMIT_SIZE
            }
        };
    }
    fileFilter(req, file, cb) {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
            cb(null, true);
        }
        else {
            cb(new Error('unsupported file'), false);
        }
    }
};
__decorate([
    __param(1, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], S3Service.prototype, "fileFilter", null);
S3Service = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], S3Service);
exports.S3Service = S3Service;
//# sourceMappingURL=s3.service.js.map