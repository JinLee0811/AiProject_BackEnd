import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './boards/boards.module';
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
import { CategoryRepository } from './tonics/repositories/catetory.repository';
import { AdminService } from './admin/admin.service';
import { SolutionsController } from './solutions/solutions.controller';
import { SolutionsService } from './solutions/solutions.service';
import { SolutionRepository } from './solutions/solution.repository';
import { TonicCategoryRepository } from './tonics/repositories/tonic-category.repository';

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
  ],
  controllers: [
    BoardController,
    TonicsController,
    SolutionsController,
    AdminController,
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
  ],
})
export class AppModule {}
