import { User } from './user.model';
export declare class UserService {
    private userModel;
    constructor(userModel: typeof User);
    findOne(username: string): Promise<User | null>;
    findOneWithOutPassword(id: number): Promise<User | null>;
}
