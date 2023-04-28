import { Module, ValidationPipe } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsController } from './boards/boards.controller';
import { APP_PIPE } from '@nestjs/core';
import { BoardsService } from './boards/boards.service';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), BoardsModule],
  // controllers: [BoardsController],
  // providers: [{ provide: APP_PIPE, useClass: ValidationPipe }],
})
export class AppModule {}
