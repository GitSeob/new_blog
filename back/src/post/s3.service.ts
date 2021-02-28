import { Injectable, UploadedFile } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModuleOptions } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';
import * as MulterS3 from 'multer-s3';

@Injectable()
export class S3Service {
	private s3: any;
	private readonly FILE_LIMIT_SIZE = 1024 * 1024 * 10;

	constructor(private readonly configService: ConfigService) {
		this.s3 = new AWS.S3();

		AWS.config.update({
			accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
			secretAccessKey: this.configService.get('AWS_SECRET_KEY')
		});
	};

	createMulterOptions(): MulterModuleOptions | Promise<MulterModuleOptions> {
		const bucket: string = this.configService.get('AWS_S3_BUCKET');
		const acl: string = 'public-read';

		const multerS3Storage = MulterS3({
			s3: this.s3,
			bucket,
			acl,
			metadata: (req, file, cb) => {
				cb(null, { fieldName: file.fieldname });
			},
			key: (req, file, cb) => {
				const nowDate = Date.now();
				cb(null, `images/${nowDate}-${file.originalname}`)
			},
		});

		return {
			storage: multerS3Storage,
			fileFilter: this.fileFilter,
			limits: {
				fileSize: this.FILE_LIMIT_SIZE
			}
		}
	}

	public fileFilter(req: Express.Request, @UploadedFile() file, cb: (error: Error | null, acceptFile: boolean) => void) {
		if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
			cb(null, true);
		} else {
			cb(new Error('unsupported file'), false);
		}
	}
}
