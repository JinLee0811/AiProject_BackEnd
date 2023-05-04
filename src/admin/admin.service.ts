import {
  Body,
  Delete,
  Injectable,
  NotFoundException,
  Patch,
  Post,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TonicRepository } from '../tonics/repositories/tonic.repository';
import { CreateTonicDto } from './dto/create-tonic.dto';
import { CategoryRepository } from '../tonics/repositories/catetory.repository';
import { UpdateTonicDto } from './dto/update-tonic.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(TonicRepository)
    private tonicRepository: TonicRepository,
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  //-------------------- 영양제  -------------------------

  // createTonic: 영양제 추가
  async createTonic(createTonicDto: CreateTonicDto) {
    return this.tonicRepository.createTonic(createTonicDto);
  }

  // updateTonic: 영양제 수정
  async updateTonic(tonicId, updateTonicDto: UpdateTonicDto) {
    return this.tonicRepository.updateTonic(tonicId, updateTonicDto);
  }

  // deleteTonic: 영양제 삭제
  async deleteTonic(tonicId) {
    if (!tonicId) {
      throw new NotFoundException('Invalid tonic ID');
    }

    return this.tonicRepository.deleteTonic(tonicId);
  }

  //-------------------- 카테고리  -------------------------

  // createCategory: 영양체 카테고리 추가
  async createCategory() {
    //
  }

  // updateCategory: 영양제 카테고리 수정
  async updateCategory() {
    //
  }

  // deleteCategory: 영양제 카테고리 삭제
  async deleteCategory() {
    //
  }
}
