import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Solution } from './solution.entity';

@Entity({ name: 'user_problem' })
export class UserProblem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.solutions)
  user: User;

  @ManyToOne(() => Solution, (solution) => solution.users)
  solution: Solution;

  @Column()
  user_id: number;

  @Column()
  solution_id: number;

  @Column()
  image: string;

  @Column()
  probability: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column()
  resolved_at: Date;
}
