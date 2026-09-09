import { ApiProperty } from "@nestjs/swagger";
import { PaginationDto } from "src/common/data-access/dto/pagination.dto";

export class FindUnitReviewDto extends PaginationDto{
    @ApiProperty({
        description: 'Unit MongoDB ID',
        example: '60d21b4967d0d8992e610c85',
    })
    unit:string
}