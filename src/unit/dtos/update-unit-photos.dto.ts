import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUnitPhotosDto{
    @ApiPropertyOptional({
        description: 'Uploaded unit photo URLs',
        type:[String],
        example:['https://example.com/unit-photo.jpg']
    })
    photos?:string[];
}