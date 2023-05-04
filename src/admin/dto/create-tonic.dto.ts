import { IsNotEmpty } from "class-validator";


export class CreateTonicDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  tonic_img: string;
}