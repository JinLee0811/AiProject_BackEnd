import {
  Controller, Delete, Get,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors
} from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express';
import { SolutionsService } from './solutions.service';
import 'dotenv/config';
import { multerOptions } from '../utils/multer.options';

@Controller('solution')
export class SolutionsController {
  constructor(private readonly solutionsService: SolutionsService) {}

  // getSolutionByPredict: 질병 진단
  @Post("/predict")
  @UseInterceptors(FileInterceptor('image', multerOptions('crop')))
  getSolutionByPredict(@UploadedFile() file: Express.MulterS3.File) {
    return this.solutionsService.getSolutionByPredict(file.location);
  }

  // createSolutions: (마이페이지) 해결책 자장
  @Post("/solutions")
  createSolutions() {

  }

  // getSolutions: (마이페이지) 해결책 조회
  @Get("/solutions")
  getSolutions() {


  }

  // deleteSolutionsById: (마이페이지) 해결책 삭제
  @Delete("solutions/:diseaseId")
  deleteSolutionsById() {}

}
