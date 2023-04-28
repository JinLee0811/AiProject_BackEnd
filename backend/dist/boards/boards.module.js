"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const board_entity_1 = require("./board.entity");
const boards_controller_1 = require("./boards.controller");
const boards_service_1 = require("./boards.service");
const board_repository_1 = require("./repositories/board.repository");
let BoardModule = class BoardModule {
};
BoardModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([board_entity_1.Board])],
        controllers: [boards_controller_1.BoardController],
        providers: [boards_service_1.BoardService, board_repository_1.BoardRepository],
    })
], BoardModule);
exports.BoardModule = BoardModule;
//# sourceMappingURL=boards.module.js.map