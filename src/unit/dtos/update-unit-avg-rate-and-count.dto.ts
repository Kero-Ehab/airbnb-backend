import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUnitAvgRateAndCount{
    @ApiProperty({
        description:'Unit MOngoDB ID',
        example: '60d21b4967d0d8992e610c85'
    })
    @IsNotEmpty()
    @IsString()
    unitId: string;

    @ApiProperty({
        description:'Updated rating count', 
        example:15
    })
    @IsNotEmpty()
    ratingCount: number;

    @ApiProperty({
        description: 'Updated rating average',
        example: 4.7
    })
    @IsNotEmpty()
    ratingAvg: number;
}