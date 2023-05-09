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
const path = require('path');

@Injectable()
export class SolutionsService {
  constructor(
    @InjectRepository(SolutionRepository)
    private solutionRepository: SolutionRepository,
    private userRepository: UserRepository,
    private userProblemRepository: UserProblemRepository
  ) {}

  // getSolutionByPredict: 질병 예측 및 진단 서비스
  async getSolutionByPredict(fileUrl: string) {
    // 모델 예측 로직 작성
    // 모델 로드

    // const modelData = fs.readFileSync('./model.pt');
    // const model = new TorchTensor.loadModel(modelData);

    // const modelPath = 'src/assets/baseline_1.ckpt';
    // const modelData = fs.readFileSync(modelPath);
    // const model = new ScriptModule(modelData);
    //
    //
    // // 이미지 -> tensor 로드
    // const response = await fetch(fileUrl);
    // const buffer = await response.arrayBuffer();
    // const tensor = await sharp(buffer)
    //     .resize({width: 224, height: 224}) // 이미지를 224 x 224로 리사이즈
    //     .ensureAlpha()// alpha 채널이 존재하지 않으면 추가, 이 작업은 Tensor 객체를 생성하는 데 필요
    //     .raw() // 이미지 데이터를 raw 포맷으로 가져옴. Tensor 객체를 생성하는 데 필요한 데이터 형식
    //     .toBuffer() // 가져온 rqw 데이터를 버퍼로 변환
    //     .then(data => TorchTensor.fromArray(new Uint8Array(data), [3, 224, 224])) // 버퍼 데이터를 Uint8Array 형식으로 변환하고, Tensor 객체로 만들기 위해 Tensor.fromArray 메소드를 사용
    //
    // // 이미지 정규화
    // const normalizedTensor = tensor.normalize(
    //     { mean: [0.485, 0.456, 0.406], std: [0.229, 0.224, 0.225] }
    // );
    //
    // // 모델 예측
    // const output = model.forward(normalizedTensor)
    // const result = output.toArray();
    // console.log(result)

    // 예측된 diseaseId를 레포지토리에 넘겨 db에서 해결책 받아옴
    const solution = await this.solutionRepository.getSolutionById(1);
    return { ...solution, crop_img: fileUrl };
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
