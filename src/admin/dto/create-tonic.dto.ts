import { IsNotEmpty } from "class-validator";


export class CreateTonicDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  short_description: string;

  @IsNotEmpty()
  categoryIds: []
}