import { AuthService } from 'src/auth/auth.service';
import { ConfigService } from '@nestjs/config';
export declare class UserController {
    private authService;
    private configService;
    constructor(authService: AuthService, configService: ConfigService);
    getProfile(req: any): Promise<any>;
    login(req: any, res: any): Promise<any>;
}
