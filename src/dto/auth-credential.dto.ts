import{ IsEmail ,IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto{
    
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    user_id : string;

    @IsEmail()
    @IsNotEmpty()
    email : string;

    @IsNotEmpty()
    name : string;

    @IsNotEmpty()
    nick_name : string

    @IsNotEmpty()
    password : string;

    user_img : string;

    role : string;
}