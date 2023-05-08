import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Solution } from "./entities/solution.entity";

@Injectable()
export class SolutionRepository extends Repository<Solution> {
  constructor(private dataSource: DataSource) {
    super(Solution, dataSource.createEntityManager());
  }

  // getSolutionByPredict: 예측된 질병 따른 해결책 조회
  async getSolutionByPredict(diseaseId:number): Promise<Solution> {
    const solution: Solution=  await this.findOne({ where: { id: diseaseId } })
    return solution;
  }


  // createSolutions: (마이페이지) 해결책 자장
  async  createSolution() {
    // user_solution 테이블 저장
  }


  // getSolutions: (마이페이지) 해결책 조회
  async getSolutions() {
    // user, user_solution 테이블 조인
  }


  // deleteSolutionsById: (마이페이지) 해결책 삭제
  async deleteSolutionById() {
    // user, user_solution 테이블 조인
  }

}
