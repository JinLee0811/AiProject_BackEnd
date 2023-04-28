import { Board } from '../board.entity';
import { CreateBoardDto } from '../dto/create-board.dto';
import { DataSource, Repository } from 'typeorm';
import { BoardStatus } from '../board-status.enum';
import { UpdateBoardDto } from 'dist/boards/dto/update-board.dto';
export declare class BoardRepository extends Repository<Board> {
    private dataSource;
    constructor(dataSource: DataSource);
    createBoard(createBoardDto: CreateBoardDto): Promise<Board>;
    getAllBoards(): Promise<Board[]>;
    getBoardById(id: number): Promise<Board>;
    updateBoard(id: number, updateBoardDto: UpdateBoardDto): Promise<Board>;
    updateBoardStatus(id: number, status: BoardStatus): Promise<Board>;
}
