import { Injectable, NotFoundException } from "@nestjs/common";
import { CountryRepository } from "../repository/country.repository";
import { QueryFilter } from "mongoose";
import { Country } from "../schema/country.schema";
import { CountryResposeDTo } from "../dtos/country-response.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class FindOneUsecase{

    constructor(
        private readonly countryRepository: CountryRepository
    ){}

    async execute(query: QueryFilter<Country>): Promise<CountryResposeDTo>{
        const country = await this.countryRepository.findOne(query)
        if (!country) {
            throw new NotFoundException('Country not found');
        }
        return plainToInstance(CountryResposeDTo, country)
    }
}