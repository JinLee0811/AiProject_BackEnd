import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Solution } from "../entities/solution.entity";

@Injectable()
export class SolutionRepository extends Repository<Solution> {
  constructor(private dataSource: DataSource) {
    super(Solution, dataSource.createEntityManager());
  }

  // getSolutionByPredict: 예측된 질병 따른 해결책 조회!
  async getSolutionById(solutionId:number): Promise<Solution> {
    const solution: Solution=  await this.findOne({
      where: { id: solutionId },
    select: ["id", "disease_name", "crop_name", "disease_solution"]})
    return solution;
  }




}
