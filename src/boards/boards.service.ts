//boards.service.ts
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BoardRepository } from './repositories/board.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateBoardDto } from './dto/update-board.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class BoardService {
  // constructor(@InjectRepository(BoardRepository)private readonly boardRepository: BoardRepository) {}
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  createBoard(createBoardDto: CreateBoardDto, imageUrl?: string) {
    //const imageUrl = file.location;
    //return this.boardRepository.createBoard(createBoardDto, imageUrl);

    try {
      return this.boardRepository.createBoard(createBoardDto, imageUrl);
    } catch (error) {
      throw new InternalServerErrorException('게시글 생성 실패');
    }
  }

  async getAllBoards() {
    return await this.boardRepository.getAllBoards();
  }

  async getBoardById(id: number) {
    const found = await this.boardRepository.getBoardById(id);
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }

  async updateBoard(
    id: number,
    updateBoardDto: UpdateBoardDto,
    imageUrl?: string,
  ) {
    try {
      return this.boardRepository.updateBoard(id, updateBoardDto, imageUrl);
    } catch (error) {
      throw new InternalServerErrorException('게시글 수정 실패');
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus) {
    return this.boardRepository.updateBoardStatus(id, status);
  }

  async deleteBoard(id: number): Promise<string> {
    if (!id) {
      throw new NotFoundException(`Invalid Board ID`);
    }

    const result = await this.boardRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return '삭제 완료';
  }
}
