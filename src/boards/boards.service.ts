//boards.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardRepository } from './repositories/board.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
  // constructor(@InjectRepository(BoardRepository)private readonly boardRepository: BoardRepository) {}
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  createBoard(createBoardDto: CreateBoardDto, imageUrl?: string) {
    //const imageUrl = file.location;
    return this.boardRepository.createBoard(createBoardDto, imageUrl);
  }

  async getAllBoards() {
    return await this.boardRepository.getAllBoards();
  }

  async getBoardById(id: number) {
    const found = await this.boardRepository.getBoardById(id);
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }

  async updateBoard(
    id: number,
    updateBoardDto: UpdateBoardDto,
    imageUrl?: string,
  ) {
    return await this.boardRepository.updateBoard(id, updateBoardDto, imageUrl);
  }

  async updateBoardStatus(id: number, status: BoardStatus) {
    return await this.boardRepository.updateBoardStatus(id, status);
  }

  async deleteBoard(id: number): Promise<void> {
    if (!id) {
      throw new NotFoundException(`Invalid Board ID`);
    }

    const result = await this.boardRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    //return await this.boardRepository.delete(id);
  }
}
