import { Injectable } from "@nestjs/common";
import { CreateCityUsecase } from "./use-cases/create-city.usecase";
import { UpdateCityUsecase } from "./use-cases/update-city.usecase";
import { FindAllCitiesUsecase } from "./use-cases/find-all-cities.usecase";
import { SoftDeleteCityUsecase } from "./use-cases/soft-delete-city.usecase";
import { FindOneCityUsecase } from "./use-cases/find-one.usecase";
import { FindCityByIdUsecase } from "./use-cases/find-city-by-id.usecase";
import { CreateCityDto } from "./dtos/create-city.dto";
import { CityResponseDto } from "./dtos/city-response.dto";
import { UpdateCityDto } from "./dtos/update-city.dto";
import { PaginationResult } from "src/common/data-access";
import { FindAllCitiesDto } from "./dtos/find-all-cities.dto";
import { QueryFilter } from "mongoose";
import { City } from "./schema/city.schema";

@Injectable()
export class CitiesService{
    constructor(
        private readonly createCityUseCase: CreateCityUsecase,
        private readonly updateCityUsecase: UpdateCityUsecase,
        private readonly findAllCitiesUsecase: FindAllCitiesUsecase,
        private readonly deleteCityUsecase: SoftDeleteCityUsecase,
        private readonly findOneCityUsecase: FindOneCityUsecase,
        private readonly findCityByIdUsecase:FindCityByIdUsecase
    ){}
    
    async createCity(body: CreateCityDto): Promise<CityResponseDto>{
        return this.createCityUseCase.execute(body)
    }

    async updateCity(
        cityId:string,
        body: UpdateCityDto
    ):Promise<CityResponseDto>{
        return this.updateCityUsecase.execute(cityId, body)
    }

    async delete(cityId: string):Promise<void>{
        return this.deleteCityUsecase.execute(cityId)
    }

    async findAll(
        query:FindAllCitiesDto
    ):Promise<PaginationResult<CityResponseDto>>{
        return this.findAllCitiesUsecase.execute(query)
    }

    async findCityById(cityId: string): Promise<CityResponseDto> {
        return this.findCityByIdUsecase.execute(cityId);
    }             

    async findOne(query: QueryFilter<City>):Promise<CityResponseDto>{
        return this.findOneCityUsecase.execute(query)
    }
}