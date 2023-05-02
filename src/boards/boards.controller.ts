//controllers.boards.controller.ts
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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Board } from './board.entity';
import { BoardService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { BoardStatus } from './board-status.enum';
import { multerOptions } from 'src/utils/multer.options';
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
  //게시글 생성
  @Post()
  @UseInterceptors(FileInterceptor('board_img', multerOptions('board')))
  async createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @UploadedFile() file,
  ): Promise<Board> {
    console.log(file);
    const board = await this.boardService.createBoard(
      createBoardDto,
      file?.location,
    );
    return board;
  }
  //게시글 수정
  @Patch(':id')
  @UseInterceptors(FileInterceptor('board_img', multerOptions('board')))
  async updateBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBoardDto: UpdateBoardDto,
    @UploadedFile() file,
  ): Promise<Board> {
    return await this.boardService.updateBoard(
      id,
      updateBoardDto,
      file?.location,
    );
  }

  //공개여부
  @Patch(':id/status')
  async updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return await this.boardService.updateBoardStatus(id, status);
  }
  // deleteBoard(@Param('id', ParseIntPipe) id,
  //delete 정상 응답 추가해야함!
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.boardService.deleteBoard(id);
  }
}
