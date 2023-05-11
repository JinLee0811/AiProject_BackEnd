// import { Injectable } from '@nestjs/common';

// import { UserLike } from './user-like.entity';

// import { Board } from '../boards/board.entity';
// import { User } from 'src/users/entities/user.entity';
// import { UserRepository } from 'src/users/repositories/user.repository';

// @Injectable()
// export class BoardService {
//   async addLikeToBoard(boardId: number, userId: number): Promise<void> {
//     // UserLike 엔티티에 새로운 데이터를 추가합니다.
//     const like = new UserLike();
//     like.boardId = boardId;
//     like.userId = userId;
//     await like.save();

//     // 해당 게시글(Board) 엔티티의 좋아요 수를 1 증가시킵니다.
//     const board = await Board.findOneOrFail(boardId);
//     board.likes += 1;
//     await board.save();
//   }
// }
