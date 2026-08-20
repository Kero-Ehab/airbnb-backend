import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmpty, IsOptional, IsString } from "class-validator";

export class CreateUnitCategoryDto{
    @ApiProperty({ description: 'Unit category name', example: 'Apartment' })
    @IsEmpty()
    @IsString()
    name:string

    @ApiPropertyOptional({ description: 'Icon identifier or URL', example: 'fa-building' })
    @IsOptional()
    @IsString()
    icon?:string
}