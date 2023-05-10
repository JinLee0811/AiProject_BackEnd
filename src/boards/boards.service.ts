//boards.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BoardRepository } from './repositories/board.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateBoardDto } from './dto/update-board.dto';
import { User } from 'src/users/entities/user.entity';
import { UserRepository } from 'src/users/repositories/user.repository';

@Injectable()
export class BoardService {
  // constructor(@InjectRepository(BoardRepository)private readonly boardRepository: BoardRepository) {}
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  createBoard(createBoardDto: CreateBoardDto, user: User, imageUrl?: string) {
    //const imageUrl = file.location;
    //return this.boardRepository.createBoard(createBoardDto, imageUrl);

    try {
      return this.boardRepository.createBoard(createBoardDto, user, imageUrl);
    } catch (error) {
      throw new InternalServerErrorException('게시글 생성 실패');
    }
  }
  //게시글 전체 조회
  async getAllBoards() {
    return await this.boardRepository.getAllBoards();
  }
  //나의 게시글 조회
  async getMyBoards(user: User) {
    const query = this.boardRepository.createQueryBuilder('board');
    query.where('board.user_id = :user_id', { user_id: user.id });
    const board = await query.getMany();
    return board;
  }
  //게시글 상세 조회
  async getBoardById(id: number) {
    const found = await this.boardRepository.getBoardById(id);
    return found;
  }

  async updateBoard(
    id: number,
    updateBoardDto: UpdateBoardDto,
    user: User,
    imageUrl?: string,
  ) {
    try {
      return this.boardRepository.updateBoard(
        id,
        updateBoardDto,
        user,
        imageUrl,
      );
    } catch (error) {
      throw new InternalServerErrorException('게시글 수정 실패');
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus) {
    return this.boardRepository.updateBoardStatus(id, status);
  }

  async deleteBoard(id: number, user: User): Promise<string> {
    return this.boardRepository.deleteBoard(id, user);
  }
}
