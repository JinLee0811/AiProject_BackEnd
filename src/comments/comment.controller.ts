import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/users/auth/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/crate-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AdminAuthGuard } from 'src/users/auth/admin-auth.guard';

@Controller('comment/:boardId')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(AuthGuard()) //로그인된 유저만 생성 가능
  async createComment(
    @Param('boardId') boardId: string,
    @Body() createCommentDto: CreateCommentDto,
    @GetUser() user: User,
    // 부모 댓글 ID 전달받음
  ) {
    //console.log(boardId);
    return await this.commentService.createComment(
      Number(boardId),
      createCommentDto,
      user,
    );
  }
  //댓글 전체 조회
  @Get()
  async findAll(@Param('boardId') boardId: string) {
    return await this.commentService.findAll(Number(boardId));
  }
  //댓글 수정
  @Patch(':commentId')
  @UseGuards(AuthGuard()) //로그인된 유저만 수정 가능
  async updateComment(
    @Param('boardId') boardId: string,
    @Param('commentId') commentId: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @GetUser() user: User,
  ) {
    return await this.commentService.updateComment(
      Number(boardId),
      Number(commentId),
      updateCommentDto,
      user,
    );
  }

  //댓글 삭제
  @Delete(':commentId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard()) // 로그인된 유저만 삭제 가능
  async deleteComment(
    @Param('boardId') boardId: string,
    @Param('commentId') commentId: string,
    @GetUser() user: User,
  ): Promise<{ message: string }> {
    await this.commentService.deleteComment(
      Number(boardId),
      Number(commentId),
      user,
    );
    return { message: '삭제 완료' };
  }
}
