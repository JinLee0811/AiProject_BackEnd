import {BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Category } from "./category.entity";
// import { JoinTable } from "typeorm/browser";
import { JoinTable } from "typeorm"
import {TonicCategory} from "./tonic-category.entity";

@Entity()
export class Tonic extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  short_description:string;

  @Column()
  image: string;

  @Column({
    type: 'timestamp',

    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  updated_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => TonicCategory, tonicCategory => tonicCategory.tonic)
  tonicCategories: TonicCategory[];

  @ManyToMany(() => Category, category => category.tonics)
  @JoinTable({
    name: "tonic_category",
    joinColumn: { name: 'tonic_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' }
  })
  categories: Category[];
}
