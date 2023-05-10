import {
  Body,
  Controller,
  Post,
  Headers,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Get,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  //회원가입
  @Post('/signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.userService.signUp(createUserDto);
  }
  //로그인
  @Post('/signin')
  async login(@Body() loginUserDto: LoginUserDto) {
    // const token = await this.userService.login(loginUserDto);
    // return { token };

    const { access_token, refresh_token } = await this.userService.login(
      loginUserDto,
    );
    return { access_token, refresh_token };
  }
  //어세스 토큰 재발급 (만료시)
  @Post('/access')
  async refreshAccessToken(@Body('refresh_token') refreshToken: string) {
    const accessToken = await this.userService.refreshAccessToken(refreshToken);

    return { access_token: accessToken };
  }
  //로그아웃
  @Delete('/signout/:userId')
  @UseGuards(AuthGuard()) //로그인한 유저만 가능
  @HttpCode(HttpStatus.OK)
  async signOut(@Param('userId') userId: number): Promise<{ message: string }> {
    return await this.userService.signOut(userId);
  }
  //나의 정보 조회
  // @Get('/profile')
  // @UseGuards(AuthGuard()) //로그인한 유저만 가능
  // async getUserById(@Param('userId', ParseIntPipe) id: number): Promise<User> {
  //   return await this.userService.getUserById(id);
  // }
  @Get('/profile')
  @UseGuards(AuthGuard()) //로그인한 유저만 가능
  async getUserById(@GetUser() user: User): Promise<User> {
    return await this.userService.getUserById(user.id);
  }
  //나의 정보 수정
  @Patch('/profile')
  @UseGuards(AuthGuard())
  async updateUserProfile(
    @GetUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.updateUserProfile(user.id, updateUserDto);
  }
}
