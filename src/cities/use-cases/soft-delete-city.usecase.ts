import { Injectable, NotFoundException } from "@nestjs/common";
import { CityRepository } from "../repository/city.repository";

@Injectable()
export class SoftDeleteCityUsecase{

    constructor(
        private readonly cityRepository:CityRepository 
    ){}

    async execute(cityId: string):Promise<void>{
        const city = await this.cityRepository.findOne({
            _id: cityId,
            isDeleted: false
        })
        if(!city){
            throw new NotFoundException('City not fount to be deleted')
        }
        await this.cityRepository.findByIdAndUpdate(cityId,{
            isDeleted: true,
            deletedAt: new Date()
        })
    }
}