import { UnauthorizedException } from '@nestjs/common/exceptions';
import *as dotenv from 'dotenv';
import { AuthRepository } from '../Auth/repositories/auth.repository';
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from 'passport-jwt'
import { User } from '../entities/user.entity';

dotenv.config();

@Injectable()
export class JwtStategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(AuthRepository)
        private userRepository : AuthRepository
    ) {
        super({
            secretOrKey : process.env.JWT_ACCESS_TOKEN_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload) {
        const { user_id } = payload;
        const user: User = await this.userRepository.findOne({where : {user_id}});

        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }

}