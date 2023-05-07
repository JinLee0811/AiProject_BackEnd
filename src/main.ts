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

  await app.listen(3000);
}
bootstrap();
