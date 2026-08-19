import { Injectable, NotFoundException } from "@nestjs/common";
import { CityRepository } from "../repository/city.repository";
import { CityResponseDto } from "../dtos/city-response.dto";
import { Types } from "mongoose";
import { plainToInstance } from "class-transformer";

@Injectable()
export class FindCityByIdUsecase{
    constructor(
        private readonly cityRepository: CityRepository
    ){}

    async execute(cityId: string):Promise<CityResponseDto>{
        const city = await this.cityRepository.findOne({
            _id: new Types.ObjectId(cityId),
            isDeleted:false
        })
        if(!city){
            throw new NotFoundException('City not found')
        }
        return plainToInstance(CityResponseDto, city)
    }
}