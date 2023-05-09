import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Board } from 'src/boards/board.entity';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenService } from './token/token.service';
import { RefreshTokenRepository } from './token/token.repository';
import { RefreshToken } from './token/token.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './token/jwt.strategy';
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
      signOptions: { expiresIn: '1h' },
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
    // RedisService
  ],
  controllers: [UserController],

  exports: [JwtStrategy, PassportModule],
})
export class UserModule {}
