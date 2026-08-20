import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUnitCategoryDto{
    @ApiProperty({ description: 'Unit category name', example: 'Apartment' })
    @IsNotEmpty()
    @IsString()
    name:string

    @ApiPropertyOptional({ description: 'Icon identifier or URL', example: 'fa-building' })
    @IsOptional()
    @IsString()
    icon?:string
}