/// <reference types="express-serve-static-core" />
/// <reference types="passport" />
/// <reference types="express-session" />
import { ConfigService } from '@nestjs/config';
import { MulterModuleOptions } from '@nestjs/platform-express';
export declare class S3Service {
    private readonly configService;
    private s3;
    private readonly FILE_LIMIT_SIZE;
    constructor(configService: ConfigService);
    createMulterOptions(): MulterModuleOptions | Promise<MulterModuleOptions>;
    fileFilter(req: Express.Request, file: any, cb: (error: Error | null, acceptFile: boolean) => void): void;
}
