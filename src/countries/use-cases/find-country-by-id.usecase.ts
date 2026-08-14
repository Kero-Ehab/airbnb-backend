import { Injectable, NotFoundException } from "@nestjs/common";
import { CountryRepository } from "../repository/country.repository";
import { plainToInstance } from "class-transformer";
import { CountryResposeDTo } from "../dtos/country-response.dto";

@Injectable()
export class FindCountryByIdUsecase{

    constructor(
        private readonly countryRepository: CountryRepository
    ){}

    async execute(id: string): Promise<CountryResposeDTo>{
        const country = await this.countryRepository.findOne({
            _id:id,
            isDeleted:{$ne:true}
        })
        if(!country){
            throw new NotFoundException('No country found')
        }
        return plainToInstance(CountryResposeDTo, country)
    }
}