import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Get,
  HttpCode,
  HttpStatus,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateTonicDto } from './dto/create-tonic.dto';
import { UpdateTonicDto } from './dto/update-tonic.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../utils/multer.options';
import { AdminAuthGuard } from '../users/auth/admin-auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  //-------------------- 영양제  -------------------------

  // createTonic: 영양제 추가
  @Post('/tonics')
  @UseGuards(AdminAuthGuard)
  @UseInterceptors(FileInterceptor('image', multerOptions('tonic')))
  async createTonic(
    @UploadedFile() file,
    @Body() createTonicDto: CreateTonicDto,
  ) {
    // 이미지 전용 파이프를 만들어야 하는지 고민
    // 요청: (body) 영양제 정보
    // 응답: 생성된 영양제 정보
    return await this.adminService.createTonic(file.location, createTonicDto);
  }

  // updateTonic: 영양제 수정
  @Patch('tonics/:tonicId')
  @UseGuards(AdminAuthGuard)
  @UseInterceptors(FileInterceptor('image', multerOptions('tonic')))
  async updateTonic(
    @UploadedFile() file,
    @Param('tonicId', ParseIntPipe) tonicId: number,
    @Body() updateTonicDto: UpdateTonicDto,
  ) {
    // 요청: (param) 수정할 영양제 id, (body) 수정할 영양제 정보
    // 응답: 수정된 영양제 정보
    // 이미지를 재첨부 하지 않을 시 원래 이미지의 경로가 오는지 빈 값이 오는지 체크

    return await this.adminService.updateTonic(tonicId, file, updateTonicDto);
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
    return await this.adminService.updateCategory(
      categoryId,
      updateCategoryDto,
    );
  }

  // deleteCategory: 영양제 카테고리 삭제
  @Delete('tonics/categories/:categoryId')
  @UseGuards(AdminAuthGuard)
  async deleteCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    // 요청: (param) 삭제할 카테고리 id
    // 응답: 성공 메시지

    // 카테고리 사용하고있는 영양제가 있으면, 오류 메시지 던져주기

    return await this.adminService.deleteCategory(categoryId);
  }
  //-------------------- 유저 관리  -------------------------
  //유저 전체 조회
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('users')
  @UseGuards(AdminAuthGuard)
  async getAllUsers() {
    return await this.adminService.getAllUsers();
  }
  //유저 삭제
  @Delete('users/:userId')
  @UseGuards(AdminAuthGuard)
  async deleteUser(@Param('userId', ParseIntPipe) id: number) {
    await this.adminService.deleteUserAdmin(id);
    return { message: '유저 삭제 완료' };
  }
  //-------------------- 게시판  -------------------------
  //게시글 삭제
  @Delete('board/:boardId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminAuthGuard)
  async deleteBoardAdmin(
    @Param('boardId', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    const message = await this.adminService.deleteBoardAdmin(id);
    return { message };
  }
}
