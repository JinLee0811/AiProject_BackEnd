"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardService = void 0;
const common_1 = require("@nestjs/common");
const board_repository_1 = require("./repositories/board.repository");
const typeorm_1 = require("@nestjs/typeorm");
let BoardService = class BoardService {
    constructor(boardRepository) {
        this.boardRepository = boardRepository;
    }
    createBoard(createBoardDto) {
        return this.boardRepository.createBoard(createBoardDto);
    }
    async getAllBoards() {
        return await this.boardRepository.getAllBoards();
    }
    async getBoardById(id) {
        const found = await this.boardRepository.getBoardById(id);
        if (!found) {
            throw new common_1.NotFoundException(`Can't find Board with id ${id}`);
        }
        return found;
    }
    async updateBoard(id, updateBoardDto) {
        return await this.boardRepository.updateBoard(id, updateBoardDto);
    }
    async updateBoardStatus(id, status) {
        return await this.boardRepository.updateBoardStatus(id, status);
    }
    async deleteBoard(id) {
        if (!id) {
            throw new common_1.NotFoundException(`Invalid Board ID`);
        }
        const result = await this.boardRepository.delete({ id });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Can't find Board with id ${id}`);
        }
    }
};
BoardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(board_repository_1.BoardRepository)),
    __metadata("design:paramtypes", [board_repository_1.BoardRepository])
], BoardService);
exports.BoardService = BoardService;
//# sourceMappingURL=boards.service.js.map