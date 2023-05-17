import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SolutionRepository } from './repositories/solution.repository';
import * as tf from '@tensorflow/tfjs-node';
import { ScriptModule, TorchTensor } from 'torchjs';

import fetch from 'node-fetch';
import sharp from 'sharp';
import * as fs from 'fs';
import { UserProblemRepository } from './repositories/user-problem.repository';
import { CreateUsersolutionDto } from './dto/create-Usersolution.dto';
import { UserRepository } from '../users/repositories/user.repository';
import { AxiosResponse } from 'axios';
import { string } from '@tensorflow/tfjs-node';
import { HttpService } from '@nestjs/axios';
// import * as querystring from "querystring";
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class SolutionsService {
  constructor(
    @InjectRepository(SolutionRepository)
    private solutionRepository: SolutionRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(UserProblemRepository)
    private userProblemRepository: UserProblemRepository,
    private httpService: HttpService,
  ) {}

  // getSolutionByPredict: 질병 예측 및 진단 서비스
  async getSolutionByPredict(file) {
    // 모델 예측 로직 작성

    const endpoint = process.env.AI_HOST + '/predict';
    const url = `${endpoint}?image_key=${file.key}`;
    const result = await this.httpService.post(url).toPromise();
    const { solutionId, probability } = result.data;

    console.log(probability)

    // 예측된 diseaseId를 레포지토리에 넘겨 db에서 해결책 받아옴
    const solution = await this.solutionRepository.getSolutionById(solutionId);

    // resolved_at: 현재 시간 구하기
    const now = await new Date();
    const kstDate = now
      .toLocaleString('en-US', { timeZone: 'Asia/Seoul', hour12: false })
      .substr(0, 19);
    const [month, day, year, time] = kstDate.split(/\/|,\s*/);
    const formattedDateStr = `${year}-${month.padStart(2, '0')}-${day.padStart(
      2,
      '0',
    )}  ${time}`;
    const formattedDateStr2 = formattedDateStr.replace(/\s{2,}/g, ' ');

    return {
      ...solution,
      image: file.location,
      resolved_at: formattedDateStr2,
      probability: probability
    };
  }

  // createSolutions: (마이페이지) 유저해결책 자장
  async createUserSolution(
    userId: number,
    createUserSolutionDto: CreateUsersolutionDto,
  ) {
    // userProblem 테이블에 userId, solutionId, image, resolved_at 저장
    const userSolution = await this.userProblemRepository.createUserSolution(
      userId,
      createUserSolutionDto,
    );

    // 저장된 user, solution 정보 반환
    return userSolution;
  }

  // getSolutions: (마이페이지) 유저해결책 조회
  async getUserSolutions(userId: number) {
    return await this.userProblemRepository.getUserSolutions(userId);
  }

  // getSolutionById: (마이페이지) 해결책 상세 조회
  async getUserSolutionById(userId: number, userSolutionId: number) {
    return await this.userProblemRepository.getUserSolutionById(
      userId,
      userSolutionId,
    );
  }

  // deleteSolutionsById: (마이페이지) 유저해결책 삭제
  async deleteUserSolutionById(userSolutionId: number) {
    return await this.userProblemRepository.deleteUserSolutionById(
      userSolutionId,
    );
  }
}
