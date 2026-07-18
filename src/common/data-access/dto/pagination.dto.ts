import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

export class PaginationDto {

    @ApiProperty({
        description: 'Page number',
        example: 1,
        minimum: 1,
    })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    page?:number;

    @ApiProperty({
        description: 'Limit number',
        example: 10,
        minimum: 1,
    })
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    limit?:number;

    @ApiProperty({
        description: 'Ignore pagination limit and return all results',
        example: false,
    })
    @IsOptional()
    ignoreLimit?:boolean;

}




