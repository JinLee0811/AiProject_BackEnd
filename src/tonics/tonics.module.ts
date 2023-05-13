import { Module } from '@nestjs/common';
import { TonicsController } from './tonics.controller';
import { TonicsService } from './tonics.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Tonic } from "./entities/tonic.entity";
import { Category } from "./entities/category.entity";
import { TonicRepository } from "./repositories/tonic.repository";
import { CategoryRepository } from "./repositories/category.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Tonic, Category])],
  controllers: [TonicsController],
  providers: [TonicsService, TonicRepository, CategoryRepository]
})
export class TonicsModule {}
