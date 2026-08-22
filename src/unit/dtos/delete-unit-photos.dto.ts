import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsString } from "class-validator";

export class DeleteUnitPhotosDto{
    @ApiProperty({
        description: 'Photo URLs to delete from the unit',
        type: [String],
        example: ['https://example.com/unit-photo.jpg'],
    })
    @IsArray()
    @ArrayNotEmpty()
    @IsString({each: true})
    photos:string[]
}