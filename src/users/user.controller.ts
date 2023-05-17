import {
  Body,
  Controller,
  Post,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Get,
  UseGuards,
  Put,
  ClassSerializerInterceptor,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './services/user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './auth/get-user.decorator';
import { UpdateNicknameDto } from './dto/update-nickname.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  //--------------------------------------회원가입--------------------------------------
  @Post('/signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.userService.signUp(createUserDto);
  }
  //--------------------------------------로그인--------------------------------------

  @Post('/signin')
  async login(@Body() loginUserDto: LoginUserDto) {
    const { access_token, refresh_token } = await this.userService.login(
      loginUserDto,
    );
    return { access_token, refresh_token };
  }

  //-------------------------------어세스 토큰 재발급 (만료시)-------------------------------
  @Post('/access')
  async refreshAccessToken(@Body('refresh_token') refreshToken: string) {
    const accessToken = await this.userService.refreshAccessToken(refreshToken);

    return { access_token: accessToken };
  }

  //--------------------------------------로그아웃--------------------------------------
  @Delete('/signout/:userId')
  @UseGuards(AuthGuard()) //로그인한 유저만 가능
  @HttpCode(HttpStatus.OK)
  async signOut(@Param('userId') userId: number): Promise<{ message: string }> {
    return await this.userService.signOut(userId);
  }

  //--------------------------------------나의 정보 조회--------------------------------------
  @Get('/profile')
  @UseGuards(AuthGuard()) //로그인한 유저만 가능
  async getUserById(@GetUser() user: User): Promise<User> {
    return await this.userService.getUserById(user.id);
  }

  //--------------------------------------나의 정보 수정--------------------------------------
  //비밀번호 수정
  @Put('/password')
  @UseGuards(AuthGuard())
  async updatePassword(
    @GetUser() user: User,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    return await this.userService.updatePassword(user.id, updatePasswordDto);
  }

  //닉네임 수정
  @UseInterceptors(ClassSerializerInterceptor) //password 빼고 보냄
  @Put('/nickname')
  @UseGuards(AuthGuard())
  async updateUserNickname(
    @GetUser() user: User,
    @Body() updateNicknameDto: UpdateNicknameDto,
  ): Promise<User> {
    return await this.userService.updateUserNickname(
      user.id,
      updateNicknameDto,
    );
  }

  //--------------------------------------회원 탈퇴--------------------------------------
  @Delete('/profile')
  @UseGuards(AuthGuard())
  async deleteUser(
    @GetUser() user: User,
    @Body() body: { password: string },
  ): Promise<{ message: string }> {
    try {
      await this.userService.deleteUser(user.id, body.password);
      return {
        message: '유저 삭제 완료',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
