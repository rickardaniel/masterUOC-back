import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateNewDTO{
    // @IsNumber()
    // @IsNotEmpty()
    // id:number

    // @IsString()
    // title:string

    // @IsString()
    // body:string
    
    // @IsString()
    // datetime:string
    title: string;
    body: string;
    datetime: string;
}