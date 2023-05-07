import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.userService.signUp(createUserDto);
  }
  @UseGuards(AuthGuard('local'))
  @Post('/sign-in')
  async login(@Body() loginUserDto: LoginUserDto) {
    // const token = await this.userService.login(loginUserDto);
    // return { token };

    const { access_token, refresh_token } = await this.userService.login(
      loginUserDto,
    );
    return { access_token, refresh_token };
  }

  @Post('/refresh')
  async refreshAccessToken(@Body('refresh_token') refreshToken: string) {
    const accessToken = await this.userService.refreshAccessToken(refreshToken);
    return { access_token: accessToken };
  }
}
