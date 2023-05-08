import { Injectable, Param } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TonicRepository } from "./repositories/tonic.repository";
import { CategoryRepository } from "./repositories/category.repository";

@Injectable()
export class TonicsService {
  constructor(
    @InjectRepository(TonicRepository)
    private tonicRepository: TonicRepository,
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository
  ) {}

  // getTonics: 영양제 전체 조회
  async getTonics() {
    return await this.tonicRepository.getTonics();
  }

  // getTonicById: 영양제 상세 조회
  async getTonicById(tonicId: number) {
    return await this.tonicRepository.getTonicById(tonicId);
  }

  // getTonicsByCategory: 카테고리 별 영양제 조회
  async getTonicsByCategory(categoryId: number) {
    return await this.tonicRepository.getTonicsByCategory(categoryId);
  }

  // getCategories: 영양제 카테고리 조회
  async getCategories() {
    return await this.categoryRepository.getCategories()
  }
}
