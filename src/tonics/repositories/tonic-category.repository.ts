
import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, Repository } from 'typeorm';

import {TonicCategory} from "../entities/tonic-category.entity";


@Injectable()
export class TonicCategoryRepository extends Repository<TonicCategory> {
    constructor(private dataSource: DataSource) {
        super(TonicCategory, dataSource.createEntityManager());
    }

    // saveTonicCategory: tonic_category 테이블에 값 저장 (영양제 생성시사용)!
    async saveTonicCategory(tonicCategories) {
        await this.save(tonicCategories)
    }

    // deleteTonicCategoryByTonicId: 특정 영양제 row 모두 삭제 (영양제 수장시 사용)!
    async deleteTonicCategoryByTonicId(tonicId:number) {
        await this.delete({tonic_id: tonicId});
    }

}