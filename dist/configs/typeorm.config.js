"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeORMConfig = void 0;
const dotenv = require("dotenv");
dotenv.config();
exports.typeORMConfig = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../**/*.entity.{js, ts}'],
    synchronize: true
};
//# sourceMappingURL=typeorm.config.js.map