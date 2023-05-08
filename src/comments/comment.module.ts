import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Board } from '../boards/board.entity';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { UserRepository } from 'src/users/user.repository';
import { UserModule } from 'src/users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Board]), UserModule],

  controllers: [CommentController],
  providers: [CommentService, UserRepository],
})
export class CommentModule {}
