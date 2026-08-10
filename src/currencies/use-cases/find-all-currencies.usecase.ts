import { Injectable } from "@nestjs/common";
import { CurrencyRepository } from "../repository/currency.repository";
import { FindAllDto } from "../dtos/find-all.dto";
import { PaginationResult } from "src/common/data-access";
import { CurrencyResponseDto } from "../dtos/currency-response.dto";
import { QueryFilter } from "mongoose";
import { Currency } from "../schema/currency.schema";
import { plainToInstance } from "class-transformer";

@Injectable()
export class FindAllCurrenciesUsecase{

    constructor(
        private readonly currencyRepository: CurrencyRepository
    ) {}

    async execute(query: FindAllDto):Promise<PaginationResult<CurrencyResponseDto>>{
        const matchedQuery: QueryFilter<Currency> = {isDeleted: {$ne: true}}
        if(query?.name){
            matchedQuery.name = {$regex: query.name, $options: 'i'}
        }        
        if(query?.currencyCode){
            matchedQuery.currencyCode = query.currencyCode
        }
        const result = await this.currencyRepository.findPaginated(matchedQuery,{
            page: query?.page,
            limit: query?.limit,
            ignoreLimit: query?.ignoreLimit,
            lean: true,
        })

        return plainToInstance(PaginationResult<CurrencyResponseDto>, result)
    }
}