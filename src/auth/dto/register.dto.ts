import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";





export class RegisterDto{

    @ApiProperty({
        description:'Name of User',
        example:'joe'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description:'Email of User',
        example:'joe@eamil.com'
    })    
    @IsEmail()
    @IsNotEmpty()
    email:string;
    

    @ApiProperty({
        description:'PhoneNumber of User',
        example:'01234567890'
    })    
    @IsString()
    @IsNotEmpty()
    phoneNumber:string;
    

    @ApiProperty({
        description:'Password of account of user',
        example:'PassWord123'
    })
    @IsString()
    @IsNotEmpty()
    password:string;




}