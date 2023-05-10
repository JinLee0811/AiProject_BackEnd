import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from '../boards/board.entity';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'text' })
  content: string;

  //대댓글
  @Column({ nullable: true })
  parent_comment_id: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: null,
    nullable: true,
    //onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @Column({
    type: 'timestamp',
    default: null,
    nullable: true,
  })
  deleted_at: Date;
  // Board와 Comment 일대다(OneToMany) 관계를 정의
  @ManyToOne(() => Board, (board) => board.comments)
  board: Board;
  // User와 Comment 일대다(OneToMany) 관계를 정의
  @ManyToOne(() => User, (user) => user.comments)
  user: User;
}
