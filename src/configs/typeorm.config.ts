import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from 'dotenv';
dotenv.config();

export const typeORMConfig : TypeOrmModuleOptions = {
    type : 'postgres',
    host : process.env.DB_HOST,
    port : 5432,
    username : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    entities : [__dirname + '/../**/*.entity.{js, ts}'],
    synchronize : true
}