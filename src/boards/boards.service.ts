//boards.service.ts
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BoardRepository } from './repositories/board.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './board-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateBoardDto } from './dto/update-board.dto';
import { User } from 'src/users/entities/user.entity';
import { UserRepository } from 'src/users/repositories/user.repository';
import { UserLikeRepository } from 'src/likes/user-like.repository';

@Injectable()
export class BoardService {
  // constructor(@InjectRepository(BoardRepository)private readonly boardRepository: BoardRepository) {}
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(UserLikeRepository)
    private userLikeRepository: UserLikeRepository,
  ) {}

  createBoard(createBoardDto: CreateBoardDto, user: User, imageUrl?: string) {
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
    query.leftJoinAndSelect('board.user', 'user');
    query.where('board.user_id = :user_id', { user_id: user.id });
    const board = await query.getMany();
    return board;
  }
  // 게시글 상세 조회
  // async getBoardById(id: number) {
  //   const found = await this.boardRepository.getBoardById(id);
  //   return found;
  // }
  //게시글 상세 조회 (댓글 필요한 부분)
  async getBoardById(id: number) {
    const found = await this.boardRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.user', 'user')
      .leftJoinAndSelect(
        'board.comments',
        'comment',
        'comment.deleted_at IS NULL',
      )
      .leftJoinAndSelect('comment.user', 'commentUser')
      .where('board.id = :id', { id })
      .orderBy('comment.created_at', 'ASC') // 작성일 최신이 위로가게
      .getOne();

    if (!found) {
      throw new NotFoundException(`게시글이 존재하지 않습니다.(id:${id})`);
    }

    found.views++;
    await this.boardRepository.save(found); //조회수 증가
    return found;
  }

  //게시글 수정
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

  // async toggleLike(boardId: number, userId: number): Promise<number> {
  //   return this.boardRepository.toggleLike(boardId, userId);
  // }
  async toggleLike(boardId: number, userId: number): Promise<number> {
    const userLike = await this.userLikeRepository.findOne({
      where: { board_id: boardId, user_id: userId },
    });
    if (userLike) {
      await this.userLikeRepository.remove(userLike);
      await this.boardRepository.decrement({ id: boardId }, 'likes', 1);

      const board = await this.boardRepository.findOne({
        where: { id: boardId },
      });
      //첫 좋아요(likes=0이면)
      if (board.likes === 0) {
        return 0;
      }
      //처음 아닌 경우 -1
      return -1;
    } else {
      await this.userLikeRepository.insert({
        board_id: boardId,
        user_id: userId,
        is_liked: true,
      });
      await this.boardRepository.increment({ id: boardId }, 'likes', 1);
      return 1;
    }
  }
}
