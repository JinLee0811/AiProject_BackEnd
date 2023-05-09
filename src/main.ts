import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  const validationPipe = new ValidationPipe();
  app.useGlobalPipes(validationPipe);
  app.enableCors({
    origin: "http://localhost:3000",
    allowedHeaders: 'Content-Type, Accept, Authorization',
    methods: 'GET, POST, PATCH, DE',
    credentials: true,
  })

  await app.listen(3001);
}
bootstrap();
