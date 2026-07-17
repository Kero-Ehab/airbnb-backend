import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTo{

    @ApiProperty({
        description:"name of the user",
        example:"john doe"
    })
    @IsString()
    @IsNotEmpty()
    name:string

    @ApiProperty({
        description:"email address of user",
        example:"john.doe@example.com"
    })
    @IsString()
    @IsNotEmpty()
    email:string

    @ApiProperty({
        description:"password of the user",
        example: "password123"
    })
    @IsString()
    @IsNotEmpty()
    password:string

    @ApiProperty({
        description:"phone number of the user",
        example:"01234567890"
    })
    @IsString()
    @IsNotEmpty()
    phoneNumber:string
}