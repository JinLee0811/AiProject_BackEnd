import { IsNotEmpty } from "class-validator";
import {time} from "aws-sdk/clients/frauddetector";

export class CreateUsersolutionDto {
    @IsNotEmpty()
    solutionId: number

    @IsNotEmpty()
    image: string

    @IsNotEmpty()
    resolvedAt: Date
}

