import { Module } from '@nestjs/common';
import { SolutionsController } from './solutions.controller';
import { SolutionsService } from './solutions.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist';

import { Solution } from './entities/solution.entity';
import { SolutionRepository } from './solution.repository';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [TypeOrmModule.forFeature([Solution]), PassportModule],
  controllers: [SolutionsController],
  providers: [SolutionsService, SolutionRepository],
})
export class SolutionsModule {}
