import {
  Controller, Delete, Get, Param,
  Post, Req,
  UploadedFile,
  UploadedFiles, UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express';
import { SolutionsService } from './solutions.service';
import 'dotenv/config';
import { multerOptions } from '../utils/multer.options';
import {AuthGuard} from "@nestjs/passport";

@Controller('solution')
export class SolutionsController {
  constructor(private readonly solutionsService: SolutionsService) {}

  // getSolutionByPredict: 질병 진단
  @Post("/predict")
  @UseInterceptors(FileInterceptor('image', multerOptions('crop')))
  getSolutionByPredict(@UploadedFile() file) {
    // 요청: 이미지 1장
    // 응답: 진단받은 질병에 대한 해결책
    return this.solutionsService.getSolutionByPredict(file.location);
  }

  // createSolutions: (마이페이지) 해결책 자장
  @Post("/solutions")
  @UseGuards(AuthGuard('jwt'))
  createSolutions() {
    // 요청: getSolutionByPredict에서 받은 응답 그대로 요청
    // 응답: 저장된 해결책

  }

  // getSolutions: (마이페이지) 해결책 조회
  @Get("/solutions")
  @UseGuards(AuthGuard())
  getSolutions(@Req() req) {
    // req.user.id로 유저의 id를 받아서 조회 함
    // 해당 유저의 해결책
    const userId = req.user.id
  }

  // deleteSolutionsById: (마이페이지) 해결책 삭제
  @Delete("solutions/:diseaseId")
  @UseGuards(AuthGuard('jwt'))
  deleteSolutionsById(@Param() solutionId: number) {
    // 요청: 삭제할 해결첵 id
    // dmdekq
  }

}
