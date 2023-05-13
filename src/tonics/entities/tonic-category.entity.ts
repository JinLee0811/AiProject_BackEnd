import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn} from 'typeorm';
import { Tonic } from './tonic.entity';
import { Category } from './category.entity';

@Entity({name: "tonic_category"})
export class TonicCategory {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Tonic, tonic => tonic.categories)
    tonic: Tonic;

    @ManyToOne(() => Category, category => category.tonics)
    category: Category;

    @Column()
    tonic_id: number

    @Column()
    category_id: number

}