import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SolutionsService } from './solutions.service';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';
import 'dotenv/config';
import { multerOptions } from '../utils/multer.options';

@Controller('solutions')
export class SolutionsController {
  constructor(private readonly solutionsService: SolutionsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', multerOptions('crop')))
  getSolutionByPredict(@UploadedFile() file: Express.MulterS3.File) {
    return { url: file.location };
    // return this.solutionsService.getSolutionByPredict(file);
    // service 에서 ai 연결하기
  }
}
