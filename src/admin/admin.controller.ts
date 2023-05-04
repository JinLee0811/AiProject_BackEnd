import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateTonicDto } from './dto/create-tonic.dto';
import { UpdateTonicDto } from './dto/update-tonic.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  //-------------------- 영양제  -------------------------

  // createTonic: 영양제 추가
  @Post('/tonics')
  async createTonic(@Body() createTonicDto: CreateTonicDto) {
    // 요청: (body) 영양제 정보
    // 응답: 생성된 영양제 정보
    return await this.adminService.createTonic(createTonicDto);
  }

  // updateTonic: 영양제 수정
  @Patch('tonics/:tonicId')
  async updateTonic(
    @Param('tonicId', ParseIntPipe) tonicId: number,
    @Body() updateTonicDto: UpdateTonicDto,
  ) {
    // 요청: (param) 수정할 영양제 id, (body) 수정할 영양제 정보
    // 응답: 수정된 영양제 정보
    return await this.adminService.updateTonic(tonicId, updateTonicDto);
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
  async createCategory() {
    //
  }

  // updateCategory: 영양제 카테고리 수정
  @Patch('tonics/categories/:categoryId')
  async updateCategory() {
    //
  }

  // deleteCategory: 영양제 카테고리 삭제
  @Delete('tonics/categories/:categoryId')
  async deleteCategory() {
    //
  }
}
