import { IsNotEmpty } from "class-validator";
import {time} from "aws-sdk/clients/frauddetector";

export class CreateUsersolutionDto {
    @IsNotEmpty()
    solution_id: number

    @IsNotEmpty()
    image: string

    @IsNotEmpty()
    resolved_at: Date
}

