import { Injectable } from "@nestjs/common";
import * as dotenv from 'dotenv';
import * as fs from 'fs';

@Injectable()
export class ConfigService {
	public readonly envConfig: {[key: string]: string};

	constructor() {
		const filePath = `.env`;
		this.envConfig = dotenv.parse(fs.readFileSync(filePath));
	}

	getValue(key: string) {
		return this.envConfig[key];
	}
}
