import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Board } from './board.entity';
import { BoardService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { BoardStatus } from './board-status.enum';
@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  async getAllBoards(): Promise<Board[]> {
    return await this.boardService.getAllBoards();
  }

  @Get(':id')
  async getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return await this.boardService.getBoardById(id);
  }

  @Post()
  async createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return await this.boardService.createBoard(createBoardDto);
  }

  @Patch(':id/status') //수정해야함(status수정, 게시글 수정 별개)
  async updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return await this.boardService.updateBoardStatus(id, status);
  }

  @Patch(':id')
  async updateBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBoardDto: UpdateBoardDto,
  ): Promise<Board> {
    return await this.boardService.updateBoard(id, updateBoardDto);
  }
  // deleteBoard(@Param('id', ParseIntPipe) id,
  //delete 정상 응답 추가해야함!
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.boardService.deleteBoard(id);
  }
}
