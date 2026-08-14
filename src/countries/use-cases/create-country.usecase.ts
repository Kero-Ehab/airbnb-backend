import { BadRequestException, Injectable } from "@nestjs/common";
import { CountryRepository } from "../repository/country.repository";
import { CreateCountryDto } from "../dtos/create-country.dto";
import { plainToInstance } from "class-transformer";
import { CountryResposeDTo } from "../dtos/country-response.dto";

@Injectable()
export class CreateCountryUsecase{

    constructor(
        private readonly countryRepository: CountryRepository
    ){}

    async execute(body: CreateCountryDto){
        const existingCountry = await this.countryRepository.findOne({
            name:body.name,
            isDeleted: {$ne: true}
        })
        if(existingCountry){
            throw new BadRequestException('Country name already exist');
        } 
        const createdCountry = await this.countryRepository.create(body)
        return plainToInstance(CountryResposeDTo, createdCountry.toObject())   
    }
}