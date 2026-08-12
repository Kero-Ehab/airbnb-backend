import { Injectable } from "@nestjs/common";
import { CreateCurrencyUsecase } from "./use-cases/create-currency.usecase";
import { FindCurrencyByIdUsecase } from "./use-cases/find-currency-by-id.usecase";
import { FindAllCurrenciesUsecase } from "./use-cases/find-all-currencies.usecase";
import { SoftDeleteCurrencyUsecase } from "./use-cases/soft-delete-currency.usecase";
import { UpdateCurrencyUsecase } from "./use-cases/update-currency.usecase";
import { CreateCurrencyDto } from "./dtos/create-currency.dto";
import { FindAllDto } from "./dtos/find-all.dto";
import { PaginationResult } from "src/common/data-access";
import { CurrencyResponseDto } from "./dtos/currency-response.dto";
import { UpdateCurrencyDto } from "./dtos/update-currency.dto";

@Injectable()
export class CurrenciesService {
    constructor(
        private readonly createCurrencyUsecase: CreateCurrencyUsecase,
        private readonly findCurrencyByIdUsecase: FindCurrencyByIdUsecase,
        private readonly findAllCurrenciesUsecase: FindAllCurrenciesUsecase,
        private readonly softDeleteCurrencyUsecase: SoftDeleteCurrencyUsecase,
        private readonly updateCurrencyUsecase: UpdateCurrencyUsecase,
    ){}

    async create(body: CreateCurrencyDto):Promise<CurrencyResponseDto>{
        return this.createCurrencyUsecase.execute(body)
    }

    async getCurrencyById(id: string): Promise<CurrencyResponseDto> {
        return this.findCurrencyByIdUsecase.execute(id);
    }

    async findAll(query: FindAllDto):Promise<PaginationResult<CurrencyResponseDto>>{
        return this.findAllCurrenciesUsecase.execute(query)
    }

    async deleteById(id: string):Promise<void>{
        return this.softDeleteCurrencyUsecase.execute(id)
    }
    async updateById(id: string,body: UpdateCurrencyDto): Promise<CurrencyResponseDto> {
        return this.updateCurrencyUsecase.execute(id, body);
    }
}