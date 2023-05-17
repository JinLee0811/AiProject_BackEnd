import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

//
async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  const validationPipe = new ValidationPipe();
  app.useGlobalPipes(validationPipe);
  app.enableCors({
    origin: process.env.CLIENT_HOST,
    // origin: "http://localhost:3000"
    allowedHeaders: 'Content-Type, Accept, Authorization',
    methods: 'GET, POST, PATCH, DELETE,PUT',
    credentials: true,
  });

  await app.listen(3001);
}
bootstrap();
