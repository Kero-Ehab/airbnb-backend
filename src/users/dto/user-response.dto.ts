import { Expose, Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";


export class UserResponseDto{
 
    @ApiProperty({
        description:"user id",
        example:"60d21b4967d0d8992e610c85"
    })
    @Expose()
    _id:string;

    @ApiProperty({
        description:"name of the user",
        example:"john doe"
    })
    @Expose()
    name:string

    @ApiProperty({
        description:"email of user",
        example:"john.doe@example.com"
    })
    @Expose()
    email:string

    @ApiProperty({
        description:"password of the user",
        example:"password123"
    })
    @Exclude()
    password:string

    @ApiProperty({
        description:"phone number of the user",
        example:"01234567890"
    })
    @Expose()
    phoneNumber:string

    @Exclude()
    __V:number;
}


























