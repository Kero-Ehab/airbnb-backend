import { BadRequestException, Injectable } from "@nestjs/common";
import { UnitCategoriesRepository } from "../repository/unit-categories.repository";
import { UpdateUnitCategoryDto } from "../dtos/update-unit-category.dto";
import { UnitCategoryResponseDto } from "../dtos/unit-category-response.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class UpdateUnitCategoryUsecase{
    constructor(
        private readonly unitCategoriesRepository: UnitCategoriesRepository
    ){}

    async execute(
        unitCategoryId:string,
        body: UpdateUnitCategoryDto
    ):Promise<UnitCategoryResponseDto>{
        const unitCategory = await this.unitCategoriesRepository.findOne({
            _id: unitCategoryId,
            isDeleted: { $ne: true },
        });

        if (!unitCategory) throw new BadRequestException('Currency not found');

        if(body?.name){
            const existingUnitCategory = await this.unitCategoriesRepository.findOne({
                name: body.name,
                isDeleted:{$ne: true},
                _id:{$ne: unitCategoryId}

            })
            
            if(existingUnitCategory){
                throw new BadRequestException('Unit category name already exists')
            }
        }
        
        const updatedUnitCategory = await this.unitCategoriesRepository.findByIdAndUpdate(
            unitCategoryId,
            body,
            {
                returnDocument: 'after'
            }
        )

        return plainToInstance(
            UnitCategoryResponseDto,
            updatedUnitCategory?.toObject()
        )
    }
}