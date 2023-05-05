import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsString()
  image?: string;

  likes?: number;

  views?: number;
}
