import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TonicRepository } from '../tonics/repositories/tonic.repository';
import { CategoryRepository } from '../tonics/repositories/catetory.repository';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Tonic } from '../tonics/entities/tonic.entity';
import { Category } from '../tonics/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tonic, Category])],
  controllers: [AdminController],
  providers: [AdminService, TonicRepository, CategoryRepository],
})
export class AdminModule {}
