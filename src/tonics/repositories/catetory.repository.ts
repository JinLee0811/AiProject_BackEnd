
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Category } from "../entities/category.entity";


@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(private dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }


  // getCategories: 영양제 카테고리 조회
  async getCategories() {
    // category 테이블 조회
    const categories = await this.find()
    return categories;
  }

}
