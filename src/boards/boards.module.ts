//boards.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardController } from './boards.controller';
import { BoardService } from './boards.service';
import { BoardRepository } from './repositories/board.repository';
import { UserModule } from 'src/users/user.module';
import { UserRepository } from 'src/users/repositories/user.repository';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [TypeOrmModule.forFeature([Board]), UserModule, PassportModule],

  controllers: [BoardController],
  providers: [BoardService, BoardRepository, UserRepository],
})
export class BoardModule {}
