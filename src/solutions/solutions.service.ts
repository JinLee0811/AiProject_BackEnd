import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SolutionRepository } from './repositories/solution.repository';
import * as tf from '@tensorflow/tfjs-node';
import { ScriptModule, TorchTensor } from 'torchjs';

import fetch from 'node-fetch';
import sharp from 'sharp';
import * as fs from 'fs';
import {UserProblemRepository} from "./repositories/user-problem.repository";
import {CreateUsersolutionDto} from "./dto/create-Usersolution.dto";
import {UserRepository} from "../users/user.repository";
import { AxiosResponse } from 'axios';
import {string} from "@tensorflow/tfjs-node";
import {HttpService} from "@nestjs/axios";
// import * as querystring from "querystring";

@Injectable()
export class SolutionsService {
  constructor(
    @InjectRepository(SolutionRepository)
    private solutionRepository: SolutionRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(UserProblemRepository)
    private userProblemRepository: UserProblemRepository,
    private httpService: HttpService
  ) {}

  // getSolutionByPredict: 질병 예측 및 진단 서비스
  async getSolutionByPredict(file) {
    // 모델 예측 로직 작성

    const endpoint = 'http://127.0.0.1:8000/predict';
    const url = `${endpoint}?image_key=${file.key}`
    const result = await this.httpService.post(url).toPromise();
    const {solutionId, probability} = result.data

    console.log(probability)

    // 예측된 diseaseId를 레포지토리에 넘겨 db에서 해결책 받아옴
    const solution = await this.solutionRepository.getSolutionById(solutionId);
    return { ...solution, image: file.location };
  }

  // createSolutions: (마이페이지) 유저해결책 자장
  async createUserSolution(userId:number, createUserSolutionDto: CreateUsersolutionDto) {
    // userProblem 테이블에 userId, solutionId, image, resolved_at 저장
    await this.userProblemRepository.createUserSolution(userId, createUserSolutionDto)

    // id가 userId인 user 조회
    const user = await this.userRepository.getUserById(userId)

    // id가 solutionId인 solution 조회
    const {solutionId} = createUserSolutionDto
    const solution = await this.solutionRepository.getSolutionById(solutionId)

    // 저장된 user, solution 정보 반환
    return {user, solution}
  }

  // getSolutions: (마이페이지) 유저해결책 조회
  async getUserSolutions(userId:number) {
    return await this.userProblemRepository.getUserSolutions(userId)
  }

  // deleteSolutionsById: (마이페이지) 유저해결책 삭제
  async deleteUserSolutionById(userSolutionId: number) {
    return await this.userProblemRepository.deleteUserSolutionById(userSolutionId)
  }
}
