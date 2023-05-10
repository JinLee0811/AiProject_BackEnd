import { Module } from '@nestjs/common';
// import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TonicRepository } from '../tonics/repositories/tonic.repository';
import { CategoryRepository } from '../tonics/repositories/category.repository';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Tonic } from '../tonics/entities/tonic.entity';
import { Category } from '../tonics/entities/category.entity';
import { TonicCategory } from '../tonics/entities/tonic-category.entity';
import { TonicCategoryRepository } from '../tonics/repositories/tonic-category.repository';
import { UserRepository } from 'src/users/repositories/user.repository';
import { User } from 'src/users/entities/user.entity';
import { BoardRepository } from 'src/boards/repositories/board.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Tonic, Category, TonicCategory, User])],
  // controllers: [AdminController],
  providers: [
    AdminService,
    TonicRepository,
    CategoryRepository,
    TonicCategoryRepository,
    UserRepository,
    BoardRepository,
  ],
})
export class AdminModule {}
