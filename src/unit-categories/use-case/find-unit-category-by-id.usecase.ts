import { Injectable, NotFoundException } from "@nestjs/common";
import { UnitCategoriesRepository } from "../repository/unit-categories.repository";
import { UnitCategoryResponseDto } from "../dtos/unit-category-response.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class FindUnitCategoryByIdUsecase{

    constructor(
        private readonly unitCategoriesRepository: UnitCategoriesRepository,
    ){}

    async execute(id:string):Promise<UnitCategoryResponseDto>{
        const unitCategory = await this.unitCategoriesRepository.findOne({
            _id:id,
            isDeleted: {$ne: true}
        }) 
        if(!unitCategory){
            throw new NotFoundException('No unit category found')
        }
        return plainToInstance(UnitCategoryResponseDto, unitCategory)
    }
}