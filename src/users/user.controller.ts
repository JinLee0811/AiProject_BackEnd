import { Body, Controller, Post, Headers, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Req } from '@nestjs/common';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.userService.signUp(createUserDto);
  }
  //@UseGuards(AuthGuard('jwt'))
  @Post('/sign-in')
  async login(@Body() loginUserDto: LoginUserDto) {
    // const token = await this.userService.login(loginUserDto);
    // return { token };

    const { access_token, refresh_token } = await this.userService.login(
      loginUserDto,
    );
    return { access_token, refresh_token };
  }

  @Post('/access')
  async refreshAccessToken(@Body('refresh_token') refreshToken: string) {
    const accessToken = await this.userService.refreshAccessToken(refreshToken);

    return { access_token: accessToken };
  }

  // @Delete('/logout')
  // async logout(@Headers('authorization') token: string) {
  //   await this.userService.addToBlacklist(token);
  // }
}
