import { IsNotEmpty } from "class-validator";


export class UpdateTonicDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  short_description: string;

  @IsNotEmpty()
  categoryIds: number[]
}