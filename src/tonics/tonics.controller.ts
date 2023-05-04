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
  getTonics() {
    // 응답: 전체 영양제 정보
    return this.tonicsService.getTonics()
  }

  // getTonicsByCategory: 카테고리 별 영양제 조회
  @Get("/:categoryId")
  getTonicsByCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    // 요청: (param) categoryId
    // 응답: 카테고리 별 영양제 정보
    return this.tonicsService.getTonicsByCategory(categoryId)
  }

  // getCategories: 영양제 카테고리 조회
  @Get("/categories")
  getCategories() {
    // 응답: 전체 카테고리 정보
    return this.tonicsService.getCategories()
  }

}
