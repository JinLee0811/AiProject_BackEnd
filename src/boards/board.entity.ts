import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Comment } from '../comments/comment.entity';
import { User } from 'src/users/entities/user.entity';
import { UserLike } from 'src/likes/user-like.entity';
@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ default: 'PUBLIC' })
  status: string;

  @Column({ default: 'null', nullable: true })
  image: string;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0, unsigned: true })
  views: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;
  //UTC를 기준으로 한 날짜와 시간을 반환

  @Column({
    type: 'timestamp',
    default: null,
    nullable: true,
    //onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @OneToMany(() => Comment, (comment) => comment.board)
  comments: Comment[];

  // User와 Board의 일대다(OneToMany) 관계를 정의
  @ManyToOne(() => User, (user) => user.boards)
  user: User;

  //UserLike 엔티티와의 일대다(OneToMany) 관계
  @OneToMany(() => UserLike, (userLike) => userLike.board)
  userLikes: UserLike[];

  @Column({ default: 0 })
  commentCount: number;
}
