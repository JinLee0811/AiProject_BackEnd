//import { createBoardDto } from './dto/create-board.dto';
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
  Put,
} from '@nestjs/common';
import { Board } from '../board.entity';
import { BoardService } from '../boards.service';
import { CreateBoardDto } from '../dto/create-board.dto';
import { UpdateBoardDto } from '../dto/update-board.dto';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  async getAll(): Promise<Board[]> {
    return await this.boardService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return await this.boardService.getOne(id);
  }

  @Post()
  async create(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return await this.boardService.create(createBoardDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBoardDto: UpdateBoardDto,
  ): Promise<Board> {
    return await this.boardService.update(id, updateBoardDto);
  }

  // deleteBoard(@Param('id', ParseIntPipe) id,
  //delete 정상 응답 추가해야함!
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.boardService.delete(id);
  }
}
