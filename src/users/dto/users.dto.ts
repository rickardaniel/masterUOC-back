import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateUserDTO{
    @IsString()
    @IsNotEmpty()
    email:number

    @IsString()
    name:string

    @IsString()
    password:string
    
    @IsString()
    accountId:string
}