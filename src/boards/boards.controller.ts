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
  UseGuards,
  UsePipes,
  ValidationPipe,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Board } from './board.entity';
import { BoardService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { BoardStatus } from './board-status.enum';
import { multerOptions } from 'src/utils/multer.options';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/users/auth/get-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  //게시글전체 조회
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAllBoards(): Promise<Board[]> {
    return await this.boardService.getAllBoards();
  }

  //게시글 상세조회
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/detail/:id')
  async getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return await this.boardService.getBoardById(id);
  }

  //나의 게시글 조회
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/myboard')
  @UseGuards(AuthGuard())
  async getMyBoard(@GetUser() user: User): Promise<Board[]> {
    return await this.boardService.getMyBoards(user);
  }

  //게시글 생성
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @UseGuards(AuthGuard()) //로그인된 유저만 생성 가능
  // @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('image', multerOptions('board')))
  async createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
    @UploadedFile() file,
  ): Promise<Board> {
    const board = await this.boardService.createBoard(
      createBoardDto,
      user,
      file?.location,
    );
    return board;
  }
  //게시글 수정
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('image', multerOptions('board')))
  async updateBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateBoardDto: UpdateBoardDto,
    @GetUser() user: User,
    @UploadedFile() file,
  ): Promise<Board> {
    return await this.boardService.updateBoard(
      id,
      updateBoardDto,
      user,
      file?.location,
    );
  }

  //공개여부
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('/status/:id')
  async updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return await this.boardService.updateBoardStatus(id, status);
  }
  //게시글 삭제
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<{ message: string }> {
    const message = await this.boardService.deleteBoard(id, user);
    return { message };
  }

  //좋아요
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/likes/:id')
  @UseGuards(AuthGuard())
  async toggleLike(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<{ likes: number }> {
    const likes = await this.boardService.toggleLike(id, user.id);
    return { likes };
  }

  //좋아요한 게시글 조회
  @Get('/likes')
  // @UseGuards(AuthGuard())
  // async getMyLikedBoards(@GetUser() user: User): Promise<Board[]> {
  //   const myLikedBoards = await this.boardService.getMyLikedBoards(user);
  //   return myLikedBoards;
  // }
  @UseGuards(AuthGuard())
  async getMyLikedBoards(
    @GetUser() user: User,
  ): Promise<{ boardId: number[] }> {
    const boardId = await this.boardService.getMyLikedBoards(user);
    return { boardId };
  }
}
