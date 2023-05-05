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
    console.log("?")
    return await this.tonicsService.getCategories()
  }

  // getTonicsByCategory: 카테고리 별 영양제 조회
  @Get("/:categoryId")
  async getTonicsByCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    // 요청: (param) categoryId
    // 응답: 카테고리 별 영양제 정보
    return await this.tonicsService.getTonicsByCategory(categoryId)
  }



}
