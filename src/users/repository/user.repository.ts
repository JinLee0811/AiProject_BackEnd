import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { NotFoundError } from "rxjs";
import { User } from "src/entities/user.entity";
import { DataSource, Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common"

export class UserRepository extends Repository<User> {
    constructor(
        @InjectRepository(User) 
        private dataSource : DataSource,
        private jwtService : JwtService
        ) {
        super(User, dataSource.manager)
    }

    async deleteUser(id : number) : Promise<void> {
        const result = await this.delete(id)

        if (result.affected === 0) {
            throw new NotFoundException(`Can't find User id ${id}`);
        }

    }

} 