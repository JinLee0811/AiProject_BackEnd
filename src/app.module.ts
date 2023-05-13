import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';

import { BoardController } from './boards/boards.controller';
import { BoardService } from './boards/boards.service';
import { BoardRepository } from './boards/repositories/board.repository';

import { CommentModule } from './comments/comment.module';
import { UserModule } from './users/user.module';
import { SolutionsModule } from './solutions/solutions.module';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from './utils/multer.options';
import { TonicsController } from './tonics/tonics.controller';
import { TonicsModule } from './tonics/tonics.module';
import { AdminModule } from './admin/admin.module';
import { AdminController } from './admin/admin.controller';
import { TonicsService } from './tonics/tonics.service';
import { TonicRepository } from './tonics/repositories/tonic.repository';
import { CategoryRepository } from './tonics/repositories/category.repository';
import { AdminService } from './admin/admin.service';
import { SolutionsController } from './solutions/solutions.controller';
import { SolutionsService } from './solutions/solutions.service';
import { SolutionRepository } from './solutions/repositories/solution.repository';
import { TonicCategoryRepository } from './tonics/repositories/tonic-category.repository';
import { BoardModule } from './boards/boards.module';
import { UserRepository } from './users/repositories/user.repository';
import { UserProblemRepository } from './solutions/repositories/user-problem.repository';
import { HttpService } from '@nestjs/axios';
import { AXIOS_INSTANCE_TOKEN } from '@nestjs/axios/dist/http.constants';
import axios from 'axios';
import { UserLikeRepository } from './likes/user-like.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    BoardModule,
    SolutionsModule,
    MulterModule.register(multerOptions('')),
    TonicsModule,
    AdminModule,
    CommentModule,
    UserModule,
    SolutionsModule,
  ],
  controllers: [
    BoardController,
    TonicsController,
    SolutionsController,
    AdminController,
    SolutionsController,
  ],
  providers: [
    BoardService,
    BoardRepository,
    SolutionsService,
    SolutionRepository,
    TonicsService,
    TonicRepository,
    CategoryRepository,
    AdminService,
    TonicCategoryRepository,
    UserRepository,
    SolutionRepository,
    UserProblemRepository,
    HttpService,
    UserLikeRepository,
    {
      provide: AXIOS_INSTANCE_TOKEN,
      useValue: axios.create(), // AXIOS_INSTANCE_TOKEN provider 추가
    },
  ],
})
export class AppModule {}
