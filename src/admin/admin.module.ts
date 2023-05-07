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

@Module({
  imports: [TypeOrmModule.forFeature([Tonic, Category, TonicCategory])],
  // controllers: [AdminController],
  providers: [
    AdminService,
    TonicRepository,
    CategoryRepository,
    TonicCategoryRepository,
  ],
})
export class AdminModule {}
