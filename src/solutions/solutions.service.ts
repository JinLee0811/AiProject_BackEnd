import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { BoardRepository } from "../boards/repositories/board.repository";
import { SolutionRepository } from "./solution.repository";

@Injectable()
export class SolutionsService {
  constructor(
    @InjectRepository(SolutionRepository)
    private solutionRepository: SolutionRepository,
  ) {}

  // getSolutionByPredict: 질병 예측 및 진단 서비스
  async getSolutionByPredict(fileUrl: string) {
    // 모델 예측 로직 작성
    // ...

    // 예측된 diseaseId를 레포지토리에 넘겨 db에서 해결책 받아옴
    const solution = this.solutionRepository.getSolutionByPredict(1)
    return { ...solution, crop_img: fileUrl };
  }

  // createSolutions: (마이페이지) 해결책 자장
  async  createSolution() {}

  // getSolutions: (마이페이지) 해결책 조회
  async getSolutions() {}

  // deleteSolutionsById: (마이페이지) 해결책 삭제
  async deleteSolutionById() {}

}
