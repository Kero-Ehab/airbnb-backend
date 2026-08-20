import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";


export class CreateCityDto{
    @ApiProperty({ description: 'City name', example: 'Cairo' })
    @IsString()
    @IsNotEmpty()
    name:string

    @ApiProperty({ description: 'Country MongoDB ID', example: '60d21b4967d0d8992e610c85' })
    @IsNotEmpty()
    @IsMongoId()
    countryId: string;
}