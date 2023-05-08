import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn} from 'typeorm';
import { Tonic } from './tonic.entity';
import { Category } from './category.entity';

@Entity({name: "tonic_category"})
export class TonicCategory {

    @ManyToOne(() => Tonic, tonic => tonic.categories)
    tonic: Tonic;

    @ManyToOne(() => Category, category => category.tonics)
    category: Category;

    @PrimaryColumn()
    tonicId: number

    @Column()
    categoryId: number

}