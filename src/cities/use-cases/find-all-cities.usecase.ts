import { Injectable } from "@nestjs/common";
import { CityRepository } from "../repository/city.repository";
import { FindAllCitiesDto } from "../dtos/find-all-cities.dto";
import { CityResponseDto } from "../dtos/city-response.dto";
import { PaginationResult } from "src/common/data-access";
import { QueryFilter } from "mongoose";
import { City } from "../schema/city.schema";
import { plainToInstance } from "class-transformer";

@Injectable()
export class FindAllCitiesUsecase{
    constructor(
        private readonly cityRepository: CityRepository
    ){}

    async execute(
        query: FindAllCitiesDto
    ):Promise<PaginationResult<CityResponseDto>>{
        const matchQuery:QueryFilter<City>={
            isDeleted: false
        }
        if(query?.name){
            matchQuery.name = {$regex: query.name, $options:'i'}
        }
        if(query?.country){
            matchQuery.countryId = query.country
        }
        const result = await this.cityRepository.findPaginated(matchQuery, {
            page: query?.page,
            limit: query?.limit,
            ignoreLimit: query?.ignoreLimit,
            populate: [{path: 'country', select: 'name'}],
            lean: true
        })
        return plainToInstance(PaginationResult<CityResponseDto>, result)
    }
}