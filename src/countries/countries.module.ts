import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ModelNames } from "src/common/data-access";
import { CountrySchema } from "./schema/country.schema";
import { CountriesServices } from "./countries.service";
import { CountryRepository } from "./repository/country.repository";
import { CreateCountryUsecase } from "./use-cases/create-country.usecase";
import { UpdateCountryUsecase } from "./use-cases/update-country.usecase";
import { FindAllCountriesUseCase } from "./use-cases/find-all-countries.usecase";
import { FindCountryByIdUsecase } from "./use-cases/find-country-by-id.usecase";
import { FindOneUsecase } from "./use-cases/find-one.usecase";
import { SoftDeleteCountryUseCase } from "./use-cases/soft-delete-country.usecase";
import { CountriesController } from "./countries.controller";

@Module({
    imports:[
        MongooseModule.forFeature([
            {name: ModelNames.COUNTRIES, schema:CountrySchema}
        ])
    ],
    providers:[
        CountriesServices,
        CountryRepository,
        CreateCountryUsecase,
        UpdateCountryUsecase,
        FindAllCountriesUseCase,
        FindCountryByIdUsecase,
        FindOneUsecase,
        SoftDeleteCountryUseCase
    ],
    controllers:[CountriesController],
    exports:[CountriesServices]
})
export class CountriesModule{}