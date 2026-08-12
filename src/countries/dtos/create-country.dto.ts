import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCountryDto{
    @ApiProperty({ description: 'Country name', example: 'Egypt' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'ISO country code', example: 'EG' })
    @IsString()
    @IsNotEmpty()
    countryCode?:string
}