import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn} from 'typeorm';
import {User} from "../../users/user.entity";
import {Solution} from "./solution.entity";


@Entity({name: "tonic_category"})
export class TonicCategory {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.solutions)
    user: User;

    @ManyToOne(() => Solution, solution => solution.users)
    solution: Solution;

    @Column()
    tonicId: number

    @Column()
    categoryId: number

    @Column()
    image: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column()
    resolvedAt: Date;

}