import { IsNotEmpty } from 'class-validator';

export class CreateUsersolutionDto {
  @IsNotEmpty()
  solution_id: number;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  resolved_at: Date;

  @IsNotEmpty()
  probability: number;
}
