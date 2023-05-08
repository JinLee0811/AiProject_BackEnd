import { IsNotEmpty } from "class-validator";

export class CreateMysolutionDto {
    @IsNotEmpty()
    disease_name: string

    @IsNotEmpty()
    crop_name: string

    @IsNotEmpty()
    disease_solution:string
}

