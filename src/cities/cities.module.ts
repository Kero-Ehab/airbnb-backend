import { Module } from "@nestjs/common";
import { CitiesService } from "./cities.service";
import { CitiesController } from "./cities.controller";
import { CityRepository } from "./repository/city.repository";
import { UpdateCityUsecase } from "./use-cases/update-city.usecase";
import { SoftDeleteCityUsecase } from "./use-cases/soft-delete-city.usecase";
import { FindAllCitiesUsecase } from "./use-cases/find-all-cities.usecase";
import { FindOneCityUsecase } from "./use-cases/find-one.usecase";
import { FindCityByIdUsecase } from "./use-cases/find-city-by-id.usecase";
import { MongooseModule } from "@nestjs/mongoose";
import { ModelNames } from "src/common/data-access";
import { CitySchema } from "./schema/city.schema";
import { CountriesModule } from "src/countries/countries.module";
import { CreateCityUsecase } from "./use-cases/create-city.usecase";

@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name: ModelNames.CITIES,
                schema: CitySchema
            }
        ]),
        CountriesModule
    ],
    providers:[
        CitiesService,
        CityRepository,
        CreateCityUsecase,
        UpdateCityUsecase,
        SoftDeleteCityUsecase,
        FindAllCitiesUsecase,
        FindOneCityUsecase,
        FindCityByIdUsecase
    ],
    controllers:[CitiesController],
    exports:[CitiesService]
})
export class CitiesModule{}