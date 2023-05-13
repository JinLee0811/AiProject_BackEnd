import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TonicsService } from "./tonics.service";

@Controller('tonics')
export class TonicsController {
  constructor(private  readonly tonicsService: TonicsService) {}

  // getTonics: 영양제 전체 조회
  @Get()
  async getTonics() {
    // 응답: 전체 영양제 정보
    return await this.tonicsService.getTonics()
  }

  // getCategories: 영양제 카테고리 조회
  @Get("/categories")
  async getCategories() {
    // 응답: 전체 카테고리 정보
    return await this.tonicsService.getCategories()
  }

  // getTonicById: 영양제 상세 조회
  @Get("/:tonicId")
  async getTonicById(@Param('tonicId', ParseIntPipe) tonicId: number) {
    // 요청: 상세 조회 할 tonicId
    //응답: id가 tonicId인 영양제 정보
    return await this.tonicsService.getTonicById(tonicId);
  }


  // getTonicsByCategory: 카테고리 별 영양제 조회
  @Get("categories/:categoryId")
  async getTonicsByCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    // 요청: (param) categoryId
    // 응답: 카테고리 별 영양제 정보
    return await this.tonicsService.getTonicsByCategory(categoryId)
  }



}
