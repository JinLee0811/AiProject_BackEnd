import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Board } from '../boards/board.entity';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { UserRepository } from 'src/users/repositories/user.repository';
import { UserModule } from 'src/users/user.module';
import { PassportModule } from '@nestjs/passport';
import { ChildController } from './childComment.controller'; //추가부분(보류)

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, Board]),
    UserModule,
    PassportModule,
  ],

  controllers: [CommentController, ChildController],
  providers: [CommentService, UserRepository],
})
export class CommentModule {}
