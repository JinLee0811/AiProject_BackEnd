//boards.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardRepository } from './repositories/board.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardService {
  // constructor(@InjectRepository(BoardRepository)private readonly boardRepository: BoardRepository) {}
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  create(createBoardDto: CreateBoardDto) {
    return this.boardRepository.createBoard(createBoardDto);
  }

  async getAll() {
    return await this.boardRepository.find();
  }

  async getOne(id: number) {
    const found = await this.boardRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    return found;
  }

  async update(id: number, updateBoardDto: UpdateBoardDto) {
    return await this.boardRepository.updateBoard(id, updateBoardDto);
  }

  async delete(id: number): Promise<void> {
    if (!id) {
      throw new NotFoundException(`Invalid Board ID`);
    }
    //console.log('########' + id);

    const result = await this.boardRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }

    //return await this.boardRepository.delete(id);
  }
}
