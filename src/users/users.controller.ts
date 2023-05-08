import { GetUser } from '../custom-deco/get-user.decoretor';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { Controller, Get, UseGuards, Delete, Param } from '@nestjs/common';
import { User } from 'src/entities/user.entity';


@Controller('/user')
@UseGuards(AuthGuard())
export class UsersController {
    constructor(private usersService : UsersService){}

    @Get('/profile')
    getProfile(@GetUser() user: User[]) {
        return user;
      }
    
    @Delete('/:id')
    deleteUser(@Param('id') id : number): Promise<void> {
      return this.usersService.deleteUser(id);
    }
}
