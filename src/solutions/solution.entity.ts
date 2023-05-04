import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  updatedAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
