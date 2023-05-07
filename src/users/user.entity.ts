import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from 'src/boards/board.entity';
import { RefreshToken } from './toeken.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column()
  email: string;

  @Column()
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
  deleted_at: Date;

  // User와 Board의 일대다(OneToMany) 관계를 정의
  @OneToMany(() => Board, (board) => board.user)
  boards: Board[];

  // User와 RefreshToken의 일대다(OneToMany) 관계를 정의
  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refresh_tokens: RefreshToken[];
}
