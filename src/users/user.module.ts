import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Board } from 'src/boards/board.entity';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenService } from './token.service';
import { RefreshTokenRepository } from './token.repository';
import { RefreshToken } from './toeken.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Board,
      RefreshToken,
      RefreshTokenRepository,
    ]),
    JwtModule.register({
      secret: 'my-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule.register({
      defaultStrategy: 'local',
    }),
  ],
  providers: [
    UserService,
    UserRepository,
    RefreshTokenRepository,
    RefreshTokenService,
    LocalStrategy,
  ],
  controllers: [UserController],
})
export class UserModule {}
