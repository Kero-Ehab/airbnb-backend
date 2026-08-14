import { Injectable } from "@nestjs/common";
import { CountryRepository } from "../repository/country.repository";
import { FindAllDto } from "../dtos/find-all.dto";
import { QueryFilter } from "mongoose";
import { Country } from "../schema/country.schema";
import { CountryResposeDTo } from "../dtos/country-response.dto";
import { plainToInstance } from "class-transformer";
import { PaginationResult } from "src/common/data-access";

@Injectable()
export class FindAllCountriesUseCase{
    
    constructor(
        private readonly countryRepository: CountryRepository
    ) {}

    async execute(
        query: FindAllDto
    ): Promise<PaginationResult<CountryResposeDTo>>{
        const matchQuery: QueryFilter<Country> = {isDeleted: {$ne: true}}
        if(query?.name){
            matchQuery.name = {$regex:query.name, $options: 'i'}
        }
        if(query?.countryCode){
            matchQuery.countryCode = query.countryCode
        }
        const result = await this.countryRepository.findPaginated(matchQuery,{
            page: query?.page,
            limit: query?.limit,
            ignoreLimit: query?.ignoreLimit,
            lean: true
        })
        return plainToInstance(PaginationResult<CountryResposeDTo>, result)
    }
}