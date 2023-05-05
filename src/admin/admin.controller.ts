import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post, UploadedFile, UseInterceptors,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateTonicDto } from './dto/create-tonic.dto';
import { UpdateTonicDto } from './dto/update-tonic.dto';
import {CreateCategoryDto} from "./dto/create-category.dto";
import {UpdateCategoryDto} from "./dto/update-category.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {multerOptions} from "../utils/multer.options";

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  //-------------------- 영양제  -------------------------

  // createTonic: 영양제 추가
  @Post('/tonics')
  @UseInterceptors(FileInterceptor("image", multerOptions('tonic')))
  async createTonic(@UploadedFile() file: Express.MulterS3.File,
                    @Body() createTonicDto: CreateTonicDto) {
    // 이미지 전용 파이프를 만들어야 하는지 고민
    // 요청: (body) 영양제 정보
    // 응답: 생성된 영양제 정보
    return await this.adminService.createTonic(file.location, createTonicDto);
  }

  // updateTonic: 영양제 수정
  @Patch('tonics/:tonicId')
  @UseInterceptors(FileInterceptor("image", multerOptions('tonic')))
  async updateTonic(
      @UploadedFile() file: Express.MulterS3.File,
    @Param('tonicId', ParseIntPipe) tonicId: number,
    @Body() updateTonicDto: UpdateTonicDto,
  ) {
    // 요청: (param) 수정할 영양제 id, (body) 수정할 영양제 정보
    // 응답: 수정된 영양제 정보
    // 이미지를 재첨부 하지 않을 시 어떻게 되는지 확인

    return await this.adminService.updateTonic(tonicId, file.location, updateTonicDto);
  }


  // deleteTonic: 영양제 삭제
  @Delete('tonics/:tonicId')
  async deleteTonic(@Param('tonicId', ParseIntPipe) tonicId: number) {
    // 요청: (param) 삭제할 영양제 id
    // 응답: 성공 메시지 어떤 식으로 줄 것인지 상의
    return await this.adminService.deleteTonic(tonicId);
  }


  //-------------------- 카테고리  -------------------------

  // createCategory: 영양체 카테고리 추가
  @Post('tonics/category')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    // 요청: (body) 카테고리 정보
    // 응답: 생성된 카테고리 정보
    return await this.adminService.createCategory(createCategoryDto);
  }

  // updateCategory: 영양제 카테고리 수정
  @Patch('tonics/categories/:categoryId')
  async updateCategory(
      @Param('categoryId', ParseIntPipe) categoryId: number,
      @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    // 요청: (param) 수정할 카레고리 id, (body) 수정할 카테고리 정보
    // 응답: 수정된 카테고리 정보
    return await this.adminService.updateCategory(categoryId, updateCategoryDto)
  }

  // deleteCategory: 영양제 카테고리 삭제
  @Delete('tonics/categories/:categoryId')
  async deleteCategory(@Param("categoryId", ParseIntPipe) categoryId:number) {
    // 요청: (param) 삭제할 카테고리 id
    // 응답: 성공 메시지?
    return await this.adminService.deleteCategory(categoryId);
  }
}
