import {
  IsString,
  Matches,
  MaxLength,
  IsOptional,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  //영어랑 숫자만 가능한 유효성 체크
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password only accepts english and number',
  })
  password?: string;
  passwordConfirm?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  nickname?: string;
}
