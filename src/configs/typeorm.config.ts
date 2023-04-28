import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'cropdoctor',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
// export const typeORMConfig: TypeOrmModuleOptions = {
//   type: 'mysql',
//   host: process.env.DB_HOST,
//   port: 3306,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: 'cropdoctor',
//   entities: [__dirname + '/../**/*.entity.{js,ts}'],
//   synchronize: true,
// };

// DB_HOST='127.0.0.1'
// DB_USER='root'
// DB_PASSWORD='root'
//   //entities: [Board],
//   synchronize: true, //// 한번 true한 뒤로는 무조건 false
//   //autoLoadEntities: true,
//   //logging: true,
// };
