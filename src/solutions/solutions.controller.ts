import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SolutionsService } from './solutions.service';
import 'dotenv/config';
import { multerOptions } from '../utils/multer.options';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../users/auth/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { CreateUsersolutionDto } from './dto/create-Usersolution.dto';

@Controller('solution')
export class SolutionsController {
  constructor(private readonly solutionsService: SolutionsService) {}

  // getSolutionByPredict: 질병 진단!
  @Post('/predict')
  @UseInterceptors(FileInterceptor('image', multerOptions('crop')))
  getSolutionByPredict(@UploadedFile() file) {
    // 요청: 이미지 1장
    // 응답: 진단받은 질병에 대한 해결책
    return this.solutionsService.getSolutionByPredict(file);
  }

  // createSolutions: (마이페이지) 해결책 자장
  @Post('')
  @UseGuards(AuthGuard())
  async createUserSolution(
    @GetUser() user: User,
    @Body() createUserSolutionDto: CreateUsersolutionDto,
  ) {
    // 요청: header token, solutionId, image, resolvedAt
    // 응답: 저장된 해결책
    return await this.solutionsService.createUserSolution(
      user.id,
      createUserSolutionDto,
    );
  }

  // getSolutions: (마이페이지) 해결책 조회
  @Get('')
  @UseGuards(AuthGuard())
  async getUserSolutions(@GetUser() user: User) {
    // 유저의 id를 받아서 조회 함
    // 해당 유저의 해결책
    return await this.solutionsService.getUserSolutions(user.id);
  }

  // getUserSolutionById: (마이페이지) 해결책 상세 조회
  @Get('/:userSolutionId')
  @UseGuards(AuthGuard())
  async getUserSolutionById(
    @Param('userSolutionId', ParseIntPipe) userSolutionId: number,
    @GetUser() user: User,
  ) {
    // 요청: (param) 상세조회할 유저 해결책 id
    // 응답: id에 해당하는 유저 해결책
    return await this.solutionsService.getUserSolutionById(
      user.id,
      userSolutionId,
    );
  }

  // deleteSolutionsById: (마이페이지) 해결책 삭제
  @Delete('/:userSolutionId')
  @UseGuards(AuthGuard())
  async deleteUserSolutionById(
    @Param('userSolutionId', ParseIntPipe) userSolutionId: number,
  ) {
    // 요청: 삭제할 나의해결책 id
    // 응답: 성공 메시지
    return await this.solutionsService.deleteUserSolutionById(userSolutionId);
  }
}
