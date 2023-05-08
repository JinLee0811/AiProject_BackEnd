import { JwtService } from "@nestjs/jwt";
import { User } from "src/entities/user.entity";
import { DataSource, Repository } from "typeorm";
export declare class UserRepository extends Repository<User> {
    private dataSource;
    private jwtService;
    constructor(dataSource: DataSource, jwtService: JwtService);
    deleteUser(id: number): Promise<void>;
}
