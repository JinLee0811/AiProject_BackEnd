import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { GetUser } from 'src/custom-deco/get-user.decoretor';
import { UserRepository } from './repository/user.repository';


@Injectable()
export class UsersService {
    constructor(
        private userRepository : UserRepository
    ) {}

    deleteUser(id : number) : Promise<void> {
        return this.userRepository.deleteUser(id);
    }

}