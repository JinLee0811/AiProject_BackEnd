import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/crate-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment/:boardId')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async createComment(
    @Param('boardId') boardId: string,
    @Body() createCommentDto: CreateCommentDto,
    // 부모 댓글 ID 전달받음
  ) {
    //console.log(boardId);
    return await this.commentService.createComment(
      Number(boardId),
      createCommentDto,
    );
  }

  @Get()
  async findAll(@Param('boardId') boardId: string) {
    return await this.commentService.findAll(Number(boardId));
  }

  @Patch(':commentId')
  async updateComment(
    @Param('boardId') boardId: string,
    @Param('commentId') commentId: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return await this.commentService.updateComment(
      Number(boardId),
      Number(commentId),
      updateCommentDto,
    );
  }

}
