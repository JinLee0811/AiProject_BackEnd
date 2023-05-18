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
    const board = await this.boardRepository
      .createQueryBuilder('board')
      .where('board.user_id = :user_id', { user_id: user.id })
      .leftJoinAndSelect('board.user', 'user')
      .leftJoinAndSelect(
        'board.comments',
        'comment',
        'comment.deleted_at IS NULL',
      )
      .leftJoinAndSelect('comment.user', 'commentUser')
      .getMany();
    //board 배열에 있는 모든 게시물들을 반복
    for (const a of board) {
      a.commentCount = a.comments.length;
      delete a.comments; //댓글 정보를 제거
      await this.boardRepository.save(a);
    }

    return board;
  }
  // 게시글 상세 조회
  // async getBoardById(id: number) {
  //   const found = await this.boardRepository.getBoardById(id);
  //   return found;
  // }

  //게시글 상세 조회 (댓글 필요한 부분)
  async getBoardById(id: number) {
    const board = await this.boardRepository
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

    if (!board) {
      throw new NotFoundException(`게시글이 존재하지 않습니다.(id:${id})`);
    }

    board.views++;
    await this.boardRepository.save(board); //조회수 증가

    const commentCount = board.commentCount; //댓글 개수
    const currentCommentCount = board.comments.length;

    if (commentCount !== currentCommentCount) {
      board.commentCount = currentCommentCount;
      await this.boardRepository.save(board);
    }

    return board;
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

  //게시글 공개 여부 수정
  async updateBoardStatus(id: number, status: BoardStatus) {
    return this.boardRepository.updateBoardStatus(id, status);
  }

  //게시글 삭제
  async deleteBoard(id: number, user: User): Promise<string> {
    return this.boardRepository.deleteBoard(id, user);
  }

  //좋아요
  async toggleLike(boardId: number, userId: number): Promise<number> {
    const board = await this.boardRepository.findOne({
      where: { id: boardId },
    });
    //없는 게시글 아이디로 요청시
    if (!board) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    const userLike = await this.userLikeRepository.findOne({
      where: { board_id: boardId, user_id: userId },
    });

    if (userLike) {
      await this.userLikeRepository.remove(userLike);
      await this.boardRepository.decrement({ id: boardId }, 'likes', 1);

      // const board = await this.boardRepository.findOne({
      //   where: { id: boardId },
      // });
      //첫 좋아요(likes=0이면)
      if (board.likes === 0) {
        return 0;
      }
      //게시글의 첫 좋아요가 아닌 경우 -1
      return -1;
    } else {
      await this.userLikeRepository.insert({
        board_id: boardId,
        user_id: userId,
        is_liked: true,
      });
      await this.boardRepository.increment({ id: boardId }, 'likes', 1);
      return 1;
      //반환값이 1 , 좋아요 추가
    }
  }

  //좋아요한 게시글
  async getMyLikedBoards(user: User) {
    const userLikes = await this.userLikeRepository.find({
      where: { user_id: user.id, is_liked: true },
      relations: ['board'],
    });
    return userLikes.map((like) => like.board.id);
  }
}
