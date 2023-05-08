import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../entities/user.entity";
import { DataSource, Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { AuthCredentialsDto } from "../../dto/auth-credential.dto";
import * as bcrypt from 'bcryptjs';
import { ConflictException, UnauthorizedException } from '@nestjs/common/exceptions';

export class AuthRepository extends Repository<User> {
    constructor(
        @InjectRepository(User)
        private dataSource : DataSource,
        private jwtSevice : JwtService
        ) {
            super(User, dataSource.manager)
    }

    async signUp(authCredentialsDto : AuthCredentialsDto) : Promise<void> {
        const {user_id, email, name, nick_name, password, user_img, role} = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.create({user_id, email, name, nick_name, password : hashedPassword, user_img, role});

        try{
            await this.save(user);
        } catch (error) {
            if(error.code === '23505') {
                throw new ConflictException('Existing username');
            }
            console.log('error', error);
        }
    }

    async signIn(authCredentialsDto : AuthCredentialsDto) : Promise<{ accessToken : string}> {
        const { user_id, password } = authCredentialsDto;
        const user = await this.findOne({ where : {user_id}});

        if(user && (await bcrypt.compare(password, user.password))) {
            const payload = { user_id };
            const accessToken = await this.jwtSevice.sign(payload);
            console.log('login success');
            return { accessToken };
        } else {
            throw new UnauthorizedException('login failed');
        }
    }


    async signOut(authCredentialsDto : AuthCredentialsDto) : Promise<void> {

    }
}