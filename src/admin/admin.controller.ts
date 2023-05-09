import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post, UploadedFile, UseInterceptors,
  UseGuards
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateTonicDto } from './dto/create-tonic.dto';
import { UpdateTonicDto } from './dto/update-tonic.dto';
import {CreateCategoryDto} from "./dto/create-category.dto";
import {UpdateCategoryDto} from "./dto/update-category.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {multerOptions} from "../utils/multer.options";
import {AdminAuthGuard} from "../users/admin-auth.guard"

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  //-------------------- 영양제  -------------------------

  // createTonic: 영양제 추가
  @Post('/tonics')
  @UseGuards(AdminAuthGuard)
  @UseInterceptors(FileInterceptor("image", multerOptions('tonic')))
  async createTonic(@UploadedFile() file,
                    @Body() createTonicDto: CreateTonicDto) {
    // 요청: (body) 영양제 정보
    // 응답: 생성된 영양제 정보
    return await this.adminService.createTonic(file.location, createTonicDto);
  }

  // updateTonic: 영양제 수정
  @Patch('tonics/:tonicId')
  @UseGuards(AdminAuthGuard)
  @UseInterceptors(FileInterceptor("image", multerOptions('tonic')))
  async updateTonic(
      @UploadedFile() file,
    @Param('tonicId', ParseIntPipe) tonicId: number,
    @Body() updateTonicDto: UpdateTonicDto,
  ) {
    // 요청: (param) 수정할 영양제 id, (body) 수정할 영양제 정보
    // 응답: 수정된 영양제 정보
    // 이미지를 재첨부 하지 않을 시 원래 이미지의 경로가 오는지 빈 값이 오는지 체크

    return await this.adminService.updateTonic(tonicId, file.location, updateTonicDto);
  }

  // deleteTonic: 영양제 삭제
  @Delete('tonics/:tonicId')
  @UseGuards(AdminAuthGuard)
  async deleteTonic(@Param('tonicId', ParseIntPipe) tonicId: number) {
    // 요청: (param) 삭제할 영양제 id
    // 응답: 성공 메시지
    return await this.adminService.deleteTonic(tonicId);
  }

  //-------------------- 카테고리  -------------------------

  // createCategory: 영양체 카테고리 추가
  @Post('tonics/category')
  @UseGuards(AdminAuthGuard)
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    // 요청: (body) 카테고리 정보
    // 응답: 생성된 카테고리 정보
    return await this.adminService.createCategory(createCategoryDto);
  }

  // updateCategory: 영양제 카테고리 수정
  @Patch('tonics/categories/:categoryId')
  @UseGuards(AdminAuthGuard)
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
  @UseGuards(AdminAuthGuard)
  async deleteCategory(@Param("categoryId", ParseIntPipe) categoryId:number) {
    // 요청: (param) 삭제할 카테고리 id
    // 응답: 성공 메시지

    // 카테고리 사용하고있는 영양제가 있으면, 오류 메시지 던져주기

    return await this.adminService.deleteCategory(categoryId);
  }
}
