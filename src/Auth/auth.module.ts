import *as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { SignController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { AuthRepository } from './repositories/auth.repository';
import { JwtStategy } from '../strateges/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

dotenv.config();


@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret : process.env.JWT_ACCESS_TOKEN_SECRET,
      signOptions:{
        expiresIn : process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
      }
    }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [SignController],
  providers: [AuthService, AuthRepository, JwtStategy],
  exports: [JwtStategy, PassportModule],
})

export class AuthModule {} 