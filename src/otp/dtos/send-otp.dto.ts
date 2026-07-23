import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SendOTP{
    
    @ApiProperty({
        description:'Email address that will receive the OTP',
        example: 'user@example.com'
    })
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email:string;
}
