import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardRepository } from './board_repository/board.repository';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

import { Board } from './board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board, BoardRepository])],
  controllers: [BoardsController],
  providers: [BoardsService, BoardRepository],
})
export class BoardsModule {}
