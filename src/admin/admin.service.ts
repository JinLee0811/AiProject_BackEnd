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
import { CategoryRepository } from '../tonics/repositories/category.repository';
import { UpdateTonicDto } from './dto/update-tonic.dto';
import {CreateCategoryDto} from "./dto/create-category.dto";
import {UpdateCategoryDto} from "./dto/update-category.dto";
import {TonicCategoryRepository} from "../tonics/repositories/tonic-category.repository";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(TonicRepository)
    private tonicRepository: TonicRepository,
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
    @InjectRepository(TonicCategoryRepository)
    private  tonicCategoryRepository: TonicCategoryRepository
  ) {}

  //-------------------- 영양제  -------------------------

  // createTonic: 영양제 추가
  async createTonic(tonic_img, createTonicDto: CreateTonicDto) {
    const tonic = await this.tonicRepository.createTonic(tonic_img, createTonicDto);

    const { categoryIds} = createTonicDto

    // tonic_category 테이블에 저장
    const tonicCategories = [];
    for (const categoryId of categoryIds) {
      const category = await this.categoryRepository.getCategoryById(categoryId)
      tonicCategories.push({tonic, category})
    }
      await this.tonicCategoryRepository.saveTonicCategory(tonicCategories);

    return tonic
  }

  // updateTonic: 영양제 수정
  async updateTonic(tonicId:number, tonicImg, updateTonicDto: UpdateTonicDto) {

    const  {categoryIds} =  updateTonicDto

    // 삭제, 수정 하기 전에 없는 카테고리가 들어오면 오류
    await Promise.all(categoryIds.map(async categoryId => {
      const category = await this.categoryRepository.getCategoryById(categoryId);

      if (!category) {
        throw new NotFoundException(`Category with id ${categoryId} does not exist`);
      }
      return category;
    }));
    
    // tonic_category 테이블에서 토닉 ID를 가진 row 모두 삭제
    await this.tonicCategoryRepository.deleteTonicCategoryByTonicId(tonicId)

    const tonicCategories = [];
    for (const categoryId of categoryIds) {
      tonicCategories.push({tonicId: tonicId, categoryId:categoryId})
    }

    await this.tonicCategoryRepository.saveTonicCategory(tonicCategories)

    // tonic 테이블 수정
    return await this.tonicRepository.updateTonic(tonicId, tonicImg, updateTonicDto);
  }

  // deleteTonic: 영양제 삭제
  async deleteTonic(tonicId) {
    if (!tonicId) {
      throw new NotFoundException('Invalid tonic ID');
    }

    // 영양제를 삭제하면 tonic_category에 있는 tonicId인 값들도 삭제
    await this.tonicCategoryRepository.deleteTonicCategoryByTonicId(tonicId)

    return this.tonicRepository.deleteTonic(tonicId);
  }


  //-------------------- 카테고리  -------------------------

  // createCategory: 영양체 카테고리 추가
  async createCategory(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.createCategory(createCategoryDto);

  }

  // updateCategory: 영양제 카테고리 수정
  async updateCategory(categoryId, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepository.updateCategory(categoryId, updateCategoryDto);
  }

  // deleteCategory: 영양제 카테고리 삭제
  async deleteCategory(categoryId) {
    if (!categoryId) {
      throw new NotFoundException('Invalid category ID');
    }

    return this.categoryRepository.deleteCategory(categoryId);  }
}
