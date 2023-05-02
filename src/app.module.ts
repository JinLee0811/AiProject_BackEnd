import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './boards/boards.module';
import { typeORMConfig } from './configs/typeorm.config';

import { BoardController } from './boards/boards.controller';
import { BoardService } from './boards/boards.service';
import { BoardRepository } from './boards/repositories/board.repository';
import { SolutionsModule } from './solutions/solutions.module';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from './utils/multer.options';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    BoardModule,
    SolutionsModule,
    MulterModule.register(multerOptions("")),
  ],
  controllers: [BoardController],
  providers: [BoardService, BoardRepository],
})
export class AppModule {}
