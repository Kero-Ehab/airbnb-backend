import { Injectable } from "@nestjs/common";
import { UnitRepository } from "../repositories/unit.repository";
import { UnitResponseDto } from "../dtos/unit-response.dto";
import { FindAllUnitsDto } from "../dtos/find-all-units.dto";
import { CurrentUserData } from "src/auth/interfaces/principal.interface";
import { QueryFilter } from "mongoose";
import { Unit } from "../schemas/unit.schema";
import { plainToInstance } from "class-transformer";
import { PaginationResult } from "src/common/data-access";

@Injectable()
export class FindAllUnitsByUserUseCase{
    constructor(
        private readonly unitsRepository: UnitRepository
    ){}


    async execute(
        query: FindAllUnitsDto,
        currentUser: CurrentUserData
    ):Promise<PaginationResult<UnitResponseDto>>{
        const matchQuery: QueryFilter<Unit> = {
            isDeleted: {$ne: true},
            user: currentUser._id.toString()
        }
        if (query?.title) matchQuery.name = { $regex: query.title, $options: 'i' };
        if (query?.country) matchQuery.country = query.country;
        if (query?.city) matchQuery.city = query.city;
        
        const result = await this.unitsRepository.findPaginated(matchQuery, {
            page: query?.page,
            limit: query?.limit,
            ignoreLimit: query?.ignoreLimit,
            lean: true,
        });

    return plainToInstance(PaginationResult<UnitResponseDto>, result);
    }
}