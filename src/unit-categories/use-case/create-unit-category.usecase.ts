import { BadRequestException, Injectable } from "@nestjs/common";
import { UnitCategoriesRepository } from "../repository/unit-categories.repository";
import { CreateUnitCategoryDto } from "../dtos/create-unit-category.dto";
import { plainToInstance } from "class-transformer";
import { UnitCategoryResponseDto } from "../dtos/unit-category-response.dto";

@Injectable()
export class CreateUnitCategoryUseCase{
    constructor(
        private readonly unitCategoriesRepository: UnitCategoriesRepository
    ){}

    async execute(body:CreateUnitCategoryDto ){
        const existingUnitCategory = await this.unitCategoriesRepository.findOne({
            name: body.name,
            isDeleted: {$ne: true}
        })
        
        if(existingUnitCategory){
            throw new BadRequestException('Unit category name already exist')
        }

        const createdUnitCategory = await this.unitCategoriesRepository.create(body)
    
        return plainToInstance(UnitCategoryResponseDto, createdUnitCategory.toObject())
    }
}