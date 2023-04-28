//repositories/board.repository.ts 데이터 관련 코드
//import { EntityRepository, Repository } from 'typeorm';
import { Board } from '../board.entity';
import { CreateBoardDto } from '../dto/create-board.dto';
import { UpdateBoardDto } from '../dto/update-board.dto';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
//import { CustomRepository } from 'typeorm';

// @EntityRepository(Board)
// export class BoardRepository extends Repository<Board> {}

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async createBoard(createBoardDto: CreateBoardDto) {
    const { title, content } = createBoardDto;
    const board = new Board();
    board.title = title;
    board.content = content;

    await this.save(board);
    return board;
  }

  async updateBoard(id: number, updateBoardDto: UpdateBoardDto) {
    const board = await this.findOne({ where: { id } });
    const { title, content } = updateBoardDto;

    if (title) {
      board.title = title;
    }
    if (content) {
      board.content = content;
    }
    board.updatedAt = new Date();

    await this.save(board);
    return board;
  }

  async removeBoard(id: number): Promise<void> {
    await this.delete(id);
  }
}
//==================================================================
// @CustomRepository(Board)
// export class BoardRepository extends Repository<Board> {
//   async createBoard(createBoardDto: CreateBoardDto) {
//     const { title, content } = createBoardDto;
//     const board = new Board();
//     board.title = title;
//     board.content = content;

//     await this.save(board);
//     return board;
//   }

//   async updateBoard(id: number, updateBoardDto: UpdateBoardDto) {
//     const board = await this.findOne({ where: { id } });
//     const { title, content } = updateBoardDto;

//     if (title) {
//       board.title = title;
//     }
//     if (content) {
//       board.content = content;
//     }
//     board.updatedAt = new Date();

//     await this.save(board);
//     return board;
//   }

//   async removeBoard(id: number): Promise<void> {
//     await this.delete(id);
//   }
// }
