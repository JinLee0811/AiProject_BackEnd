import { User } from "../../entities/user.entity";
import { DataSource, Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { AuthCredentialsDto } from "../../dto/auth-credential.dto";
export declare class AuthRepository extends Repository<User> {
    private dataSource;
    private jwtSevice;
    constructor(dataSource: DataSource, jwtSevice: JwtService);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
    signOut(authCredentialsDto: AuthCredentialsDto): Promise<void>;
}
