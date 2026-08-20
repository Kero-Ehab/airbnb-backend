import { Injectable, NotFoundException } from "@nestjs/common";
import { UnitCategoriesRepository } from "../repository/unit-categories.repository";

@Injectable()
export class SoftDeleteUnitCategoryUsecase{
    constructor(
        private readonly unitCategoriesRepository: UnitCategoriesRepository
    ){}

    async execute(unitCategoryId:string):Promise<void>{
        const existingUnitCategory = await this.unitCategoriesRepository.findOne({
            _id: unitCategoryId,
            isDeleted:{$ne:true}
        })
        
        if(existingUnitCategory){
            throw new NotFoundException('No unit categories found for this id')
        }

        await this.unitCategoriesRepository.findByIdAndUpdate(unitCategoryId,{
            isDeleted: true,
            deletedAt: new Date()
        })
    }
}