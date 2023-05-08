import { BaseEntity } from "typeorm";
export declare class User extends BaseEntity {
    id: number;
    user_id: string;
    email: string;
    name: string;
    nick_name: string;
    password: string;
    user_img: string;
    role: string;
}
