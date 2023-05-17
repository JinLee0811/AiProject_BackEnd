import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { CreateCommentDto } from './dto/crate-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Board } from '../boards/board.entity';
import { User } from 'src/users/entities/user.entity';
import { UserRepository } from 'src/users/repositories/user.repository';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}
  //댓글 생성
  async createComment(
    boardId: number,
    createCommentDto: CreateCommentDto,
    user: User,
  ): Promise<Comment> {
    const board = await this.boardRepository.findOne({
      where: { id: boardId },
    });

    let parentComment = null;
    if (createCommentDto.parent_comment_id) {
      parentComment = await this.commentRepository.findOne({
        where: { id: createCommentDto.parent_comment_id },
        relations: ['board'],
      });
    }

    const comment = this.commentRepository.create({
      ...createCommentDto,
      board,
      parent_comment_id: parentComment?.id,
      user,
    });

    return await this.commentRepository.save(comment);
  }

  //댓글 전체 조회
  async findAll(boardId: number): Promise<Comment[]> {
    return await this.commentRepository.find({
      where: {
        board: { id: boardId },
        parent_comment_id: Not(IsNull()),
        deleted_at: IsNull(),
      }, // 삭제되지 않은 댓글만 조회, 대댓글만 조회(댓글 x)
      order: { created_at: 'DESC' },
      relations: ['user'],
    });
  }

  //대댓글만 조회
  async getComment(commentId: number): Promise<Comment[]> {
    return await this.commentRepository.find({
      where: {
        parent_comment_id: commentId,
        deleted_at: IsNull(),
      },
      order: { created_at: 'DESC' },
      relations: ['user'],
    });
  }
  // async getComment(
  //   commentId: number,
  //   page: number = 1,
  //   limit: number = 3,
  // ): Promise<Comment[]> {
  //   const skip = (page - 1) * limit;
  //   const comments = await this.commentRepository.find({
  //     where: {
  //       parent_comment_id: commentId,
  //       deleted_at: IsNull(),
  //     },
  //     order: { created_at: 'ASC' },
  //     skip,
  //     take: limit,
  //   });
  //   return comments;
  // }

  //댓글 수정
  async updateComment(
    boardId: number,
    commentId: number,
    updateCommentDto: UpdateCommentDto,
    user: User,
  ): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId },
      relations: ['user'],
    });

    // updateCommentDto에서 수정할 내용 가져오기
    const { content, parent_comment_id } = updateCommentDto;

    if (comment.user.id !== user.id) {
      throw new UnauthorizedException('작성자 본인만 수정이 가능합니다.');
    }

    // comment에 수정할 내용 반영하기
    comment.content = content;
    comment.updated_at = new Date();

    // 대댓글 수정
    if (parent_comment_id !== undefined) {
      const parentComment = await this.commentRepository.findOne({
        where: { id: parent_comment_id },
        relations: ['user'],
      });
      if (parentComment.user.id !== user.id) {
        throw new UnauthorizedException('작성자 본인만 수정이 가능합니다.');
      }

      comment.parent_comment_id = parent_comment_id; //기존 값 유지
    } else {
      // 댓글 수정
      comment.parent_comment_id = comment.parent_comment_id;
    }

    return await this.commentRepository.save(comment);
  }

  //댓글 삭제
  async deleteComment(boardId: number, commentId: number, user): Promise<void> {
    // 댓글 조회
    const comment = await this.commentRepository.findOne({
      where: { id: commentId, board: { id: boardId } },
      relations: ['user'],
    });

    // 댓글이 존재하지 않을 경우
    if (comment.deleted_at) {
      throw new NotFoundException('존재하지 않는 댓글입니다.');
    }

    // 작성자 본인이 아닐 경우
    if (comment.user.id !== user.id) {
      throw new UnauthorizedException('작성자 본인만 삭제가 가능합니다.');
    }

    // 대댓글인 경우
    if (comment.parent_comment_id) {
      // 대댓글을 삭제 처리
      comment.deleted_at = new Date();
      await this.commentRepository.save(comment);
    } else {
      // 댓글을 삭제 처리
      comment.deleted_at = new Date();
      await this.commentRepository.save(comment);

      // 부모아이디가 댓글 아이디인 댓글을 찾아서 deleted_at에 시간 저장
      const childComments = await this.commentRepository.find({
        where: { parent_comment_id: commentId },
      });

      for (const childComment of childComments) {
        childComment.deleted_at = new Date();
        await this.commentRepository.save(childComment);
      }
    }
  }
}
