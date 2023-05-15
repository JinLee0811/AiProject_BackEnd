import { Board } from '../board.entity';
import { CreateBoardDto } from '../dto/create-board.dto';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BoardStatus } from '../board-status.enum';
import { UpdateBoardDto } from '../dto/update-board.dto';
import { User } from 'src/users/entities/user.entity';
@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }
  //게시글 생성
  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
    imageUrl?: string,
  ) {
    const { title, content, status } = createBoardDto;
    //==========================KST
    const now = new Date();
    const utcDate = now.toISOString();
    const kstDateTime = new Date(utcDate);
    kstDateTime.setHours(kstDateTime.getHours() + 9); // UTC 시간에서 9시간을 더해줌

    // const board = this.create({
    //   title,
    //   content,
    //   status,
    //   image: imageUrl ?? null,
    //   user,
    // });

    const board = new Board();
    board.title = title;
    board.content = content;
    board.status = status;
    board.image = imageUrl ?? null;
    board.user = user;
    board.created_at = kstDateTime;

    await board.save();

    return board;
    // await this.save(board);
    // return board;
  }

  //게시글 전체 조회
  async getAllBoards() {
    return await this.find({
      relations: ['user', 'comments', 'comments.user'],
    });
  }

  //특정 게시글 조회
  async getBoardById(id: number) {
    const found = await this.findOne({
      where: { id },
      relations: ['user', 'comments', 'comments.user'],
    });
    if (!found) {
      throw new NotFoundException(`게시글이 존재하지 않습니다.(id:${id})`);
    }
    found.views++;
    await this.save(found); //조회수 증가
    return found;
  }

  //게시글 수정
  async updateBoard(
    id: number,
    updateBoardDto: UpdateBoardDto,
    user: User,
    imageUrl?: string,
  ) {
    const { title, content, status, image } = updateBoardDto;
    const board = await this.getBoardById(id);

    if (board.user.id !== user.id) {
      throw new UnauthorizedException('작성자 본인만 수정이 가능합니다.');
    }
    //==========================KST
    const now = new Date();
    console.log('################' + now);
    const utcDate = now.toISOString();

    const kstDateTime = new Date(utcDate);

    kstDateTime.setHours(kstDateTime.getHours() + 9);
    board.updated_at = kstDateTime;

    if (title !== undefined) {
      board.title = title;
      board.updated_at = kstDateTime;
    }

    if (content !== undefined) {
      board.content = content;
      board.updated_at = kstDateTime;
    }
    // board.title = title;
    // board.content = content;
    board.status = status;
    board.user = user;

    if (imageUrl !== undefined) {
      // update board_img
      board.image = imageUrl;
      board.updated_at = kstDateTime;
    } else {
      // imageUrl가 undefined일 때 이미지 필드를 업데이트하지 않음
      board.updated_at = kstDateTime;
      await this.save(board);
      return board;
    }

    await this.save(board);
    return board;
  }
  //게시글 공개 여부
  async updateBoardStatus(id: number, status: BoardStatus) {
    const board = await this.getBoardById(id);
    board.status = status;

    await this.save(board);
    return board;
  }

  async deleteBoard(id: number, user: User) {
    const board = await this.getBoardById(id);
    if (board.user.id !== user.id) {
      throw new UnauthorizedException('작성자 본인만 수정이 가능합니다.');
    }
    const result = await this.delete({
      id,
      user: { id: user.id },
    });
    if (result.affected === 0) {
      throw new InternalServerErrorException(
        '게시글을 삭제하는데 실패했습니다.',
      );
    }

    return '삭제 완료';
  }

  async deleteBoardAdmin(boardId: number) {
    const board = await this.findOne({ where: { id: boardId } });
    const result = await this.remove(board);

    return '삭제 완료';
  }
}
