
import {Injectable, NotFoundException} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Category } from "../entities/category.entity";
import {CreateCategoryDto} from "../../admin/dto/create-category.dto";
import {UpdateCategoryDto} from "../../admin/dto/update-category.dto";


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

  // getCategoryById: 영양제 카테고리 id로 한개 조회
  async getCategoryById(categoryId) {
    const category = await this.findOne({where: {id: categoryId}})
    return category
  }




  // createCategory: 영양체 카테고리 추가
  async createCategory(createCategoryDto: CreateCategoryDto) {
    const {name} = createCategoryDto
    const category = this.create({name})
    await this.save(category)
    return category

  }

  // updateCategory: 영양제 카테고리 수정
  async updateCategory(categoryId, updateCategoryDto: UpdateCategoryDto) {
    const category =  await this.findOne({where: {id: categoryId}})

    const {name} = updateCategoryDto;
    category.name = name

    await this.save(category)
    return category
  }

  // deleteCategory: 영양제 카테고리 삭제
  async deleteCategory(categoryId) {
    const result = await this.delete({id: categoryId})
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Category with id ${categoryId}`)
    }
    return {"message": "Success"}
  }

}
