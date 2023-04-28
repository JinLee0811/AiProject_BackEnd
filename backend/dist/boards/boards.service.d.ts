import { BoardRepository } from './repositories/board.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';
export declare class BoardService {
    private boardRepository;
    constructor(boardRepository: BoardRepository);
    createBoard(createBoardDto: CreateBoardDto): Promise<import("./board.entity").Board>;
    getAllBoards(): Promise<import("./board.entity").Board[]>;
    getBoardById(id: number): Promise<import("./board.entity").Board>;
    updateBoardStatus(id: number, status: BoardStatus): Promise<import("./board.entity").Board>;
    deleteBoard(id: number): Promise<void>;
}
