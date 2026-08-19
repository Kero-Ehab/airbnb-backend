import { Injectable } from "@nestjs/common";
import { CreateCityUsecase } from "./use-cases/create-city.usecase";
import { UpdateCityUsecase } from "./use-cases/update-city.usecase";



@Injectable()
export class CitiesService{
    
    constructor(
        private readonly createCityUseCase: CreateCityUsecase,
        private readonly updateCityUsecase: UpdateCityUsecase,
        // private readonly findAllCitiesUsecase: FindAllCitiesUsecase,
        // private readonly deleteCityUsecase: SoftDeleteCityUsecase,
    ){}

}