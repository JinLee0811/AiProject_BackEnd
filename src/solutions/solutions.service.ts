import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class SolutionsService {
  async getSolutionByPredict(files: Express.Multer.File) {
    return;
  }
}
