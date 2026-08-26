import { Injectable } from "@nestjs/common";
import { FindAllUnitsDto } from "../dtos/find-all-units.dto";
import { UnitRepository } from "../repositories/unit.repository";
import { QueryFilter } from "mongoose";
import { Unit } from "../schemas/unit.schema";
import { plainToInstance } from "class-transformer";
import { PaginationResult } from "src/common/data-access";
import { UnitResponseDto } from "../dtos/unit-response.dto";

@Injectable()
export class FindAllUseCase{
    constructor(
        private readonly unitsRepository: UnitRepository
    ){}

    async execute(
        query: FindAllUnitsDto
    ){
        const matchQuery: QueryFilter<Unit> = {
            isDeleted: {$ne: true},
            isActive: true
        }

        if(query?.title) matchQuery.name = {$regex: query.title, $options: 'i'}
        if(query?.country) matchQuery.country = query.country
        if(query?.city) matchQuery.city = query.city

        const result = await this.unitsRepository.findPaginated(matchQuery,{
            page: query?.page,
            limit: query?.limit,
            ignoreLimit: query?.ignoreLimit,
            sort: {createdAt: -1},
            lean: true,
        })
        
        return plainToInstance(PaginationResult<UnitResponseDto>, result)
    }
}