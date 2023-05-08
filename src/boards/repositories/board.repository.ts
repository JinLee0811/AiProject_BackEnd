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
import { User } from 'src/users/user.entity';

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
    const { title, content } = createBoardDto;

    const board = this.create({
      title,
      content,
      image: imageUrl ?? null,
      status: BoardStatus.PUBLIC,
      user,
    });
    await this.save(board);
    return board;
  }

  //게시글 전체 조회
  async getAllBoards() {
    return await this.find({ relations: ['user'] });
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
    const { title, content, image } = updateBoardDto;
    const board = await this.getBoardById(id);

    if (board.user.id !== user.id) {
      throw new UnauthorizedException('작성자 본인만 수정이 가능합니다.');
    }

    board.title = title;
    board.content = content;
    board.user = user;
    //console.log('***********************' + board.updated_at);

    if (imageUrl !== undefined) {
      // update board_img
      board.image = imageUrl;
    }

    if (imageUrl === undefined) {
      // imageUrl가 undefined일 때 이미지 필드를 업데이트하지 않음
      board.updated_at = new Date();
      await this.save(board);
      return board;
    }

    board.updated_at = new Date();
    await this.save(board);
    return board;
  }
  //게시글 공개 여부
  async updateBoardStatus(id: number, status: BoardStatus) {
    const board = await this.getBoardById(id);
    board.status = status;
    //board.updatedAt = new Date();

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
}
