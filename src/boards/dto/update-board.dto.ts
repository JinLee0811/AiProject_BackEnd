import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateBoardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsString()
  board_img?: string;
}
