// import {
//   BaseEntity,
//   Column,
//   Entity,
//   PrimaryGeneratedColumn,
//   OneToMany,
//   ManyToOne,
// } from 'typeorm';
// import { BoardStatus } from './board-status.enum';
// import { Comment } from '../comments/comment.entity';
// import { User } from 'src/users/user.entity';
// @Entity()
// export class Board extends BaseEntity {
//   @PrimaryGeneratedColumn({ unsigned: true })
//   id: number;
//
//   @Column()
//   title: string;
//
//   @Column({ type: 'text' })
//   content: string;
//
//   @Column()
//   status: BoardStatus;
//
//   @Column({ default: null, nullable: true })
//   image: string;
//
//   @Column({ default: 0, unsigned: true })
//   likes: number;
//
//   @Column({ default: 0, unsigned: true })
//   views: number;
//
//   @Column({
//     type: 'timestamp',
//     default: () => 'CURRENT_TIMESTAMP',
//   })
//   created_at: Date;
//   //UTC를 기준으로 한 날짜와 시간을 반환
//
//   @Column({
//     type: 'timestamp',
//     //default: () => 'CURRENT_TIMESTAMP',
//     default: null,
//     nullable: true,
//     //onUpdate: 'CURRENT_TIMESTAMP',
//   })
//   updated_at: Date;
//
//   @OneToMany(() => Comment, (comment) => comment.board)
//   comments: Comment[];
//
//   // User와 Board의 일대다(OneToMany) 관계를 정의
//   @ManyToOne(() => User, (user) => user.boards)
//   user: User;
// }
