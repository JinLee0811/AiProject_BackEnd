import { UsersService } from './users.service';
import { User } from 'src/entities/user.entity';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getProfile(user: User[]): User[];
    deleteUser(id: number): Promise<void>;
}
