//boards.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardController } from './boards.controller';
import { BoardService } from './boards.service';
import { BoardRepository } from './repositories/board.repository';
import { UserModule } from 'src/users/user.module';
import { UserRepository } from 'src/users/user.repository';
@Module({
  imports: [TypeOrmModule.forFeature([Board]), UserModule],

  controllers: [BoardController],
  providers: [BoardService, BoardRepository, UserRepository],
})
export class BoardModule {}
