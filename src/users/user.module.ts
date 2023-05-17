import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';
import { Board } from 'src/boards/board.entity';
import { UserRepository } from './repositories/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenService } from './services/token.service';
import { RefreshTokenRepository } from './repositories/token.repository';
import { RefreshToken } from './entities/token.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Board,
      RefreshToken,
      RefreshTokenRepository,
    ]),
    JwtModule.register({
      secret: process.env.SECRET_KEY, //토큰 생성시
      signOptions: { expiresIn: '3h' },
    }),

    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
  providers: [
    UserService,
    UserRepository,
    RefreshTokenRepository,
    RefreshTokenService,
    JwtStrategy,
  ],
  controllers: [UserController],

  exports: [JwtStrategy, PassportModule],
})
export class UserModule {}
