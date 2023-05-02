//boards.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardController } from './boards.controller';
import { BoardService } from './boards.service';
import { BoardRepository } from './repositories/board.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],

  controllers: [BoardController],
  providers: [BoardService, BoardRepository],
})
export class BoardModule {}
