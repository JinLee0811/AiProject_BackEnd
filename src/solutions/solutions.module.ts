import { Module } from '@nestjs/common';
import { SolutionsController } from './solutions.controller';
import { SolutionsService } from './solutions.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist';

import { Solution } from './entities/solution.entity';
import { SolutionRepository } from './repositories/solution.repository';
import { UserProblemRepository } from './repositories/user-problem.repository';
import { UserProblem } from './entities/user-problem.entity';
import { User } from '../users/entities/user.entity';
import { UserRepository } from '../users/repositories/user.repository';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import { AXIOS_INSTANCE_TOKEN } from '@nestjs/axios/dist/http.constants';

@Module({
  imports: [TypeOrmModule.forFeature([Solution, UserProblem, User])],
  controllers: [SolutionsController],
  providers: [
    SolutionsService,
    SolutionRepository,
    UserProblemRepository,
    UserRepository,
    HttpService,
    {
      provide: AXIOS_INSTANCE_TOKEN,
      useValue: axios.create(), // AXIOS_INSTANCE_TOKEN provider 추가
    },
  ],
})
export class SolutionsModule {}
