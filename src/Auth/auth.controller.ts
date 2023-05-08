import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';
import { AuthCredentialsDto } from '../dto/auth-credential.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../entities/user.entity';
import { GetUser } from 'src/custom-deco/get-user.decoretor';
@Controller()
export class SignController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body() authCredentialsDto : AuthCredentialsDto) : Promise<void> {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body() authCredentialsDto : AuthCredentialsDto) : Promise<{accessToken : string}> {
        return this.authService.signIn(authCredentialsDto);
    }

    @Post('/signout')
    @UseGuards(AuthGuard())
    signOut(@Body() authCredentialsDto : AuthCredentialsDto) : Promise<void> {
        return this.authService.signOut(authCredentialsDto);
    }
}
