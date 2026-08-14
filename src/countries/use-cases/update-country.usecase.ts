import { BadRequestException, Injectable } from "@nestjs/common";
import { UpdateCountryDto } from "../dtos/update-country.dto";
import { CountryRepository } from "../repository/country.repository";
import { plainToInstance } from "class-transformer";
import { CountryResposeDTo } from "../dtos/country-response.dto";

@Injectable()
export class UpdateCountryUsecase{
    
    constructor(
        private readonly countryRepository: CountryRepository
    ){}

    async execute(
        countryId: string,
        body: UpdateCountryDto
    ):Promise<CountryResposeDTo>{
        const country = await this.countryRepository.findOne({
            id: countryId,
            isDeleted: {$ne: true}
        })
        
        if(!country){
            throw new BadRequestException('Country not found');
        }

        if(body?.name){
            const existingCountry = await this.countryRepository.findOne({
                name: body.name,
                isDeleted: {$ne: true},
                _id: {$ne: countryId}
            })
            if(existingCountry){
                throw new BadRequestException('Country name already exists');
            }
        }
        const updatedCountry = await this.countryRepository.findByIdAndUpdate(
            countryId,
            body,
            {returnDocument: 'after'}
        )
        return plainToInstance(CountryResposeDTo, updatedCountry?.toObject());
    }
}