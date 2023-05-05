import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateBoardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsString()
  image?: string;
}
