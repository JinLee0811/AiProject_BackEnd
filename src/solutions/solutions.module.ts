import { Module } from '@nestjs/common';
import { SolutionsController } from './solutions.controller';
import { SolutionsService } from './solutions.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist';

import { Solution } from './entities/solution.entity';
import { SolutionRepository } from './solution.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Solution])],
  controllers: [SolutionsController],
  providers: [SolutionsService, SolutionRepository],
})
export class SolutionsModule {}
