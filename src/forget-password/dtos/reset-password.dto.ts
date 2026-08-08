import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ResetPasswordDto{
    @ApiProperty({
        description: 'Email address for the password reset',
        example: 'user@example.com',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'New account password',
        example: 'newPassword123',
    })
    @IsNotEmpty()
    @IsString()
    newPassword: string;
}