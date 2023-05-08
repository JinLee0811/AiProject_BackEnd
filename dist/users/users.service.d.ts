import { UserRepository } from './repository/user.repository';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: UserRepository);
    deleteUser(id: number): Promise<void>;
}
