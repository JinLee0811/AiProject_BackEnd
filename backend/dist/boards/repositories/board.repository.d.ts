import { Board } from '../board.entity';
import { CreateBoardDto } from '../dto/create-board.dto';
import { DataSource, Repository } from 'typeorm';
import { BoardStatus } from '../board-status.enum';
export declare class BoardRepository extends Repository<Board> {
    private dataSource;
    constructor(dataSource: DataSource);
    createBoard(createBoardDto: CreateBoardDto): Promise<Board>;
    updateBoard(id: number, status: BoardStatus): Promise<Board>;
}
