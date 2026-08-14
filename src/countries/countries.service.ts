import { Injectable } from "@nestjs/common";
import { CreateCountryUsecase } from "./use-cases/create-country.usecase";
import { FindCountryByIdUsecase } from "./use-cases/find-country-by-id.usecase";
import { FindAllCountriesUseCase } from "./use-cases/find-all-countries.usecase";
import { SoftDeleteCountryUseCase } from "./use-cases/soft-delete-country.usecase";
import { UpdateCountryUsecase } from "./use-cases/update-country.usecase";
import { FindOneUsecase } from "./use-cases/find-one.usecase";
import { CreateCountryDto } from "./dtos/create-country.dto";
import { CountryResposeDTo } from "./dtos/country-response.dto";
import { FindAllDto } from "./dtos/find-all.dto";
import { PaginationResult } from "src/common/data-access";
import { QueryFilter } from "mongoose";
import { Country } from "./schema/country.schema";
import { UpdateCountryDto } from "./dtos/update-country.dto";

@Injectable()
export class CountriesServices{

    constructor(
        private readonly createCountryUsecase: CreateCountryUsecase,
        private readonly findCountryByIdUsecase: FindCountryByIdUsecase,
        private readonly findAllCountriesUsecase: FindAllCountriesUseCase,
        private readonly softDeleteCountryUsecase: SoftDeleteCountryUseCase,
        private readonly updateCountryUsecase: UpdateCountryUsecase,
        private readonly findOneUsecase: FindOneUsecase,
    ){}
    
    async create(body: CreateCountryDto): Promise<CountryResposeDTo>{
        return this.createCountryUsecase.execute(body)
    }
    async getCountryById(id: string): Promise<CountryResposeDTo>{
        return this.findCountryByIdUsecase.execute(id)
    }
    async findAll(query: FindAllDto):Promise<PaginationResult<CountryResposeDTo>>{
        return this.findAllCountriesUsecase.execute(query)
    }
    async findOne(query: QueryFilter<Country>): Promise<CountryResposeDTo>{
        return this.findOneUsecase.execute(query)
    }
    async updateById(
        id:string,
        body:UpdateCountryDto
    ):Promise<CountryResposeDTo>{
        return this.updateCountryUsecase.execute(id, body)
    }
    async deleteById(id:string):Promise<void>{
        return this.softDeleteCountryUsecase.execute(id)
    }
}