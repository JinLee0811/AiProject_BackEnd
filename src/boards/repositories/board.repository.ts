import { Board } from '../board.entity';
import { CreateBoardDto } from '../dto/create-board.dto';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BoardStatus } from '../board-status.enum';
import { title } from 'process';
import { UpdateBoardDto } from '../dto/update-board.dto';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async createBoard(createBoardDto: CreateBoardDto) {
    const { title, description } = createBoardDto;
    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });
    await this.save(board);
    return board;
  }
  async getAllBoards() {
    return await this.find();
  }
  async getBoardById(id: number) {
    const found = await this.findOne({ where: { id } });
    return found;
  }

  async updateBoard(id: number, updateBoardDto: UpdateBoardDto) {
    const { title, description } = updateBoardDto;
    const board = await this.getBoardById(id);
    if (title) {
      board.title = title;
    }
    if (description) {
      board.description = description;
    }
    board.updatedAt = new Date();

    await this.save(board);
    return board;
  }

  async updateBoardStatus(id: number, status: BoardStatus) {
    const board = await this.getBoardById(id);
    board.status = status;
    board.updatedAt = new Date();

    await this.save(board);
    return board;
  }
}
