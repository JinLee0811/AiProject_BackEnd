import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BoardStatus } from '../board-status.enum';
import { Board } from '../board.entity';
import { CreateBoardDto } from '../dto/create-board.dto';

@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }
}
