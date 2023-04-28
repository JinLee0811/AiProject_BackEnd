import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './boards/boards.module';
import { typeORMconfig } from './configs/typeorm.config';

import { BoardController } from './boards/controllers/boards.controller';
import { BoardService } from './boards/boards.service';
import { BoardRepository } from './boards/repositories/board.repository';
@Module({
  imports: [TypeOrmModule.forRoot(typeORMconfig), BoardModule],
  controllers: [BoardController],
  providers: [BoardService, BoardRepository],
})
export class AppModule {}
