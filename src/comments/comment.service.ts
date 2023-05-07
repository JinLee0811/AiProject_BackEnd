// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Comment } from './comment.entity';
// import { Repository } from 'typeorm';
// import { CreateCommentDto } from './dto/crate-comment.dto';
// import { UpdateCommentDto } from './dto/update-comment.dto';
// import { Board } from '../boards/board.entity';
//
// @Injectable()
// export class CommentService {
//   constructor(
//     @InjectRepository(Comment)
//     private commentRepository: Repository<Comment>,
//     @InjectRepository(Board)
//     private boardRepository: Repository<Board>,
//   ) {}
//   //댓글 생성
//   async createComment(
//     boardId: number,
//     //createCommentDto: CreateCommentDto,
//     createCommentDto: CreateCommentDto,
//   ): Promise<Comment> {
//     const board = await this.boardRepository.findOne({
//       where: { id: boardId },
//     });
//
//     let parentComment = null;
//     if (createCommentDto.parent_comment_id) {
//       parentComment = await this.commentRepository.findOne({
//         where: { id: createCommentDto.parent_comment_id },
//       });
//     }
//
//     console.log(createCommentDto.parent_comment_id);
//
//     const comment = this.commentRepository.create({
//       ...createCommentDto,
//       board,
//       parent_comment_id: parentComment?.id,
//     });
//
//     return await this.commentRepository.save(comment);
//   }
//   //댓글 전체 조회
//   async findAll(boardId: number): Promise<Comment[]> {
//     return await this.commentRepository.find({
//       where: { board: { id: boardId } },
//       order: { created_at: 'ASC' },
//     });
//   }
//
//   //댓글 수정
//
//   async updateComment(
//     boardId: number,
//     commentId: number,
//     updateCommentDto: UpdateCommentDto,
//   ): Promise<Comment> {
//     const comment = await this.commentRepository.findOne({
//       where: { id: commentId },
//     });
//
//     // updateCommentDto에서 수정할 내용 가져오기
//     const { content, parent_comment_id } = updateCommentDto;
//
//     // comment에 수정할 내용 반영하기
//     comment.content = content;
//
//     if (parent_comment_id) {
//       // 대댓글 수정
//       const parentComment = await this.commentRepository.findOne({
//         where: { id: parent_comment_id },
//       });
//
//       comment.parent_comment_id = parent_comment_id;
//     } else {
//       // 댓글 수정
//       comment.parent_comment_id = null;
//     }
//
//     return await this.commentRepository.save(comment);
//   }
// }
