import {BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {User} from "../../users/user.entity";
import {Tonic} from "../../tonics/entities/tonic.entity";

@Entity()
export class Solution extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  disease_name: string;

  @Column()
  crop_name: string;

  @Column()
  disease_solution: string;


  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToMany(() => User, user => user.solutions)
  users: User[];
}
