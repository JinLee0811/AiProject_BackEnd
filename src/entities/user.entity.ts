import { BaseEntity, Column, PrimaryGeneratedColumn, Entity, Unique, OneToMany } from "typeorm";

@Entity()
@Unique(['nick_name', 'user_id'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    user_id : string;

    @Column()
    email : string;

    @Column()
    name : string;

    @Column()
    nick_name : string;

    @Column()
    password : string;

    @Column({ default: 'image.jpg'})
    user_img : string;

    @Column({ default:'0'})
    role : string;
}