import { BadRequestException, Injectable } from "@nestjs/common";
import { CityRepository } from "../repository/city.repository";
import { CountriesServices } from "src/countries/countries.service";
import { CreateCityDto } from "../dtos/create-city.dto";
import { plainToInstance } from "class-transformer";
import { CityResponseDto } from "../dtos/city-response.dto";


@Injectable()
export class CreateCityUsecase{
    constructor(
        private readonly cityRepository:CityRepository,
        private readonly countriesService:CountriesServices
    ){}

    async execute(body: CreateCityDto):Promise<CityResponseDto>{
        
        await this.countriesService.getCountryById(body.countryId)

        const existingCityByName = await this.cityRepository.findOne({
            name: body.name,
            country: body.countryId,
            isDeleted: false,
        })

        if(existingCityByName){
            throw new BadRequestException('City already exists')
        }
        const city = await this.cityRepository.create(body)
        return plainToInstance(CityResponseDto, city.toObject())
    }
}