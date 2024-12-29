import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from "class-validator"

export class CreateNewDTO{
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsNotEmpty()
    id: number;
}