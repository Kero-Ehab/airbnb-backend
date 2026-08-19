import { Injectable } from "@nestjs/common";
import { CityRepository } from "../repository/city.repository";
import { QueryFilter } from "mongoose";
import { City } from "../schema/city.schema";
import { plainToInstance } from "class-transformer";
import { CityResponseDto } from "../dtos/city-response.dto";

@Injectable()
export class FindOneCityUsecase{
    constructor(
        private readonly cityRepository: CityRepository
    ){}
    async execute(
        query: QueryFilter<City>
    ):Promise<CityResponseDto>{
        const city = await this.cityRepository.findOne(query)
        return plainToInstance(CityResponseDto, city)
    }
}