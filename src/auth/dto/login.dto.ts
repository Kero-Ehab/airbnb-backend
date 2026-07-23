import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Roles } from "src/common/constants/roles.constants";

export class LoginDto{

    @ApiProperty({
        description: 'User email address',
        example: 'john.doe@example.com'
    })
    @IsEmail()
    @IsNotEmpty()
    email:String;


    @ApiProperty({
        description:'User Password',
        example:'PassWord123'
    })
    @IsNotEmpty()
    password:string;

    @ApiProperty({
        type:'string',
        enum:Roles,
        description:'user role',
        example:Roles.USER,
    })
    @IsNotEmpty()
    @IsEnum(Roles)
    role:Roles.USER;
}