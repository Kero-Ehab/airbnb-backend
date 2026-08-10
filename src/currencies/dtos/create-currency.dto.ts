import { Injectable } from "@nestjs/common";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";


@Injectable()
export class CreateCurrencyDto{

    @ApiProperty({ description: 'Currency name', example: 'Egyptian Pound' })
    @IsString()
    @IsNotEmpty()
    name:string;

    @ApiPropertyOptional({ description: 'ISO currency code', example: 'EGP' })
    @IsOptional()
    @IsString()
    currencyCode?: string;
}