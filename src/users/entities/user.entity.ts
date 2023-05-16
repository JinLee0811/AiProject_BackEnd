import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from 'src/boards/board.entity';
import { Comment } from 'src/comments/comment.entity';
import { RefreshToken } from './token.entity';
import { Solution } from '../../solutions/entities/solution.entity';
import { Category } from '../../tonics/entities/category.entity';
import { UserLike } from 'src/likes/user-like.entity';

// response에서 제외하게 만들어주는 Exclude
import { Exclude } from 'class-transformer';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  nickname: string;

  @Column()
  profile_image: string;

  //관리자 권한
  @Column({ type: 'tinyint' })
  is_admin: boolean;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: null,
    nullable: true,
  })
  @Exclude()
  deleted_at: Date;

  // User와 RefreshToken의 일대다(OneToMany) 관계를 정의
  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refresh_tokens: RefreshToken[];

  // User와 Board의 일대다(OneToMany) 관계를 정의
  @OneToMany(() => Board, (board) => board.user)
  boards: Board[];

  // User와 Solution의 다대다(ManyToMany) 관계를 정의
  @ManyToMany(() => Solution, (solution) => solution.users)
  @JoinTable({
    name: 'user_problem',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'solution_id', referencedColumnName: 'id' },
  })
  solutions: Solution[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => UserLike, (userLike) => userLike.user)
  likes: UserLike[];
}
