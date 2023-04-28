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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardRepository = void 0;
const board_entity_1 = require("../board.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const board_status_enum_1 = require("../board-status.enum");
let BoardRepository = class BoardRepository extends typeorm_1.Repository {
    constructor(dataSource) {
        super(board_entity_1.Board, dataSource.createEntityManager());
        this.dataSource = dataSource;
    }
    async createBoard(createBoardDto) {
        const { title, description } = createBoardDto;
        const board = this.create({
            title,
            description,
            status: board_status_enum_1.BoardStatus.PUBLIC,
        });
        await this.save(board);
        return board;
    }
    async updateBoard(id, status) {
        const board = await this.findOne({ where: { id } });
        board.status = status;
        board.updatedAt = new Date();
        await this.save(board);
        return board;
    }
};
BoardRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], BoardRepository);
exports.BoardRepository = BoardRepository;
//# sourceMappingURL=board.repository.js.map