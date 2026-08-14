import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CityRepository } from "../repository/city.repository";
import { UpdateCityDto } from "../dtos/update-city.dto";
import { plainToInstance } from "class-transformer";
import { CityResponseDto } from "../dtos/city-response.dto";

@Injectable()
export class UpdateCityUsecase{

    constructor(
        private readonly cityRepository: CityRepository
    ){}

    async execute (
        cityId:string,
        body: UpdateCityDto  
    ):Promise<CityResponseDto>{
        const city = await this.cityRepository.findOne({
            _id: cityId,
            isDeleted: false
        })
        
        if(!city){
            throw new NotFoundException('City not found')
        }
        
        const existingCityByName = await this.cityRepository.findOne({
            name: body.name,
            Country: body.country,
            isDeleted: false,
            _id: {$ne: cityId}
        })
        
        if(existingCityByName){
            throw new BadRequestException('City name already exists')
        }

        const updateCity = await this.cityRepository.findByIdAndUpdate(
            cityId, 
            body
        )
        
        return plainToInstance(CityResponseDto, updateCity?.toObject())
    }
}