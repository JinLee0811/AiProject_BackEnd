import { Board } from './board.entity';
import { BoardService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';
export declare class BoardController {
    private readonly boardService;
    constructor(boardService: BoardService);
    getAllBoards(): Promise<Board[]>;
    getBoardById(id: number): Promise<Board>;
    createBoard(createBoardDto: CreateBoardDto): Promise<Board>;
    updateBoardStatus(id: number, status: BoardStatus): Promise<Board>;
    deleteBoard(id: number): Promise<void>;
}
