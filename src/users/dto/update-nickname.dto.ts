import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateNicknameDto {
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  nickname: string;
}
