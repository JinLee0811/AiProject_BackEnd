import { Board } from '../board.entity';
import { CreateBoardDto } from '../dto/create-board.dto';
import { Injectable } from '@nestjs/common';
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
  async createBoard(createBoardDto: CreateBoardDto, imageUrl?: string) {
    const { title, content } = createBoardDto;

    const board = this.create({
      title,
      content,
      image: imageUrl ?? null,
      status: BoardStatus.PUBLIC,
    });
    await this.save(board);
    return board;
  }

  //게시글 전체 조회
  async getAllBoards() {
    return await this.find();
  }

  //특정 게시글 조회
  async getBoardById(id: number) {
    const found = await this.findOne({ where: { id } });
    found.views++;
    await this.save(found); //조회수 증가
    return found;
  }
  //게시글 수정
  async updateBoard(
    id: number,
    updateBoardDto: UpdateBoardDto,
    imageUrl?: string,
  ) {
    const { title, content, image } = updateBoardDto;
    const board = await this.getBoardById(id);

    board.title = title;
    board.content = content;
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
}
