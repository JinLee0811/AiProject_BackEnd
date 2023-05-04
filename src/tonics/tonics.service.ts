import { Injectable, Param } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TonicRepository } from "./repositories/tonic.repository";
import { CategoryRepository } from "./repositories/catetory.repository";

@Injectable()
export class TonicsService {
  constructor(
    @InjectRepository(TonicRepository)
    private tonicRepository: TonicRepository,
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository
  ) {}

  // getTonics: 영양제 전체 조회
  getTonics() {
    return this.tonicRepository.getTonics();
  }

  // getTonicsByCategory: 카테고리 별 영양제 조회
  getTonicsByCategory(categoryId: number) {
    return this.tonicRepository.getTonicsByCategory(categoryId);
  }

  // getCategories: 영양제 카테고리 조회
  getCategories() {
    return this.categoryRepository.getCategories()
  }
}
