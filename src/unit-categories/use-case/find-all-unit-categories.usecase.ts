import { Injectable } from "@nestjs/common";
import { UnitCategoriesRepository } from "../repository/unit-categories.repository";
import { FindAllDto } from "../dtos/find-all.dto";
import { QueryFilter } from "mongoose";
import { UnitCategories } from "../schema/unit-categories.schema";
import { plainToInstance } from "class-transformer";
import { PaginationResult } from "src/common/data-access";
import { UnitCategoryResponseDto } from "../dtos/unit-category-response.dto";

@Injectable()
export class FindAllUnitCategoriesUsecase {
    constructor(
        private readonly unitCategoriesRepository: UnitCategoriesRepository,
    ) {}

    async execute(query:FindAllDto): Promise<PaginationResult<UnitCategoryResponseDto>> {
        const matchQuery: QueryFilter<UnitCategories> = {
            isDeleted: {$ne:true}
        }

        if(query?.name){
            matchQuery.name = { $regex:query.name , $options:'i'}
        }

        const result = await this.unitCategoriesRepository.findPaginated(matchQuery,{
            page: query?.page,
            limit: query?.limit,
            ignoreLimit: query?.ignoreLimit,
            lean:true
        })
        return plainToInstance(PaginationResult<UnitCategoryResponseDto>, result)
    }
}