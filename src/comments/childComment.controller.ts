import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Param,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { GetUser } from 'src/users/auth/get-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('childcomment')
export class ChildController {
  constructor(private readonly commentService: CommentService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('/:commentId')
  @UseGuards(AuthGuard()) //로그인된 유저만 수정 가능
  async updateComment(
    @Param('commentId') commentId: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @GetUser() user: User,
  ) {
    return await this.commentService.updateComment(
      Number(commentId),
      updateCommentDto,
      user,
    );
  }
}
