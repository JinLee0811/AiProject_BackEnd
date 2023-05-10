import { Module } from '@nestjs/common';
import { SolutionsController } from './solutions.controller';
import { SolutionsService } from './solutions.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist';

import { Solution } from './entities/solution.entity';
import { SolutionRepository } from './repositories/solution.repository';
import { UserProblemRepository } from './repositories/user-problem.repository';
import { UserProblem } from './entities/user-problem.entity';
import { User } from '../users/user.entity';
import { UserRepository } from '../users/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Solution, UserProblem, User])],
  controllers: [SolutionsController],
  providers: [
    SolutionsService,
    SolutionRepository,
    UserProblemRepository,
    UserRepository,
  ],
})
export class SolutionsModule {}
