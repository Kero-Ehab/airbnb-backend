import { BadRequestException, Injectable } from "@nestjs/common";
import { AppSettingsService } from "src/app-settings/app-settings.service";
import { CitiesService } from "src/cities/cities.service";
import { CountriesServices } from "src/countries/countries.service";
import { UnitCategoriesService } from "src/unit-categories/unit-categories.service";
import { CreateUnitDto } from "../dtos/create-unit.dto";
import { UpdateUnitDto } from "../dtos/update-unit.dto";

@Injectable()
export class UnitValidationUseCase {
    constructor(
        private readonly appSettingsService: AppSettingsService,
        private readonly citiesService: CitiesService,
        private readonly countriesService: CountriesServices,
        private readonly unitCategoriesService: UnitCategoriesService
    ){}

    async execute(body: CreateUnitDto | UpdateUnitDto):Promise<void>{
        const appSettings = await this.appSettingsService.find()
        if(body?.costPerDay< appSettings.minPrice){
            throw new BadRequestException(
                `Cost per can not be less than min price: ${appSettings.minPrice}`,
            );
        }
        if(body?.city){
            const city = await this.citiesService.findOne({_id: body.city})
            if (!city) throw new BadRequestException('City not found');
        }
        
        if(body?.country){
            const country = await this.countriesService.findOne({
                _id: body.country
            })
            if (!country) throw new BadRequestException('Country not found');
        }
        if (body?.unitCategory) {
            const unitCategory = await this.unitCategoriesService.findOne({
                _id: body.unitCategory,
            });
        
        if (!unitCategory)
            throw new BadRequestException('Unit category not found');
        }
    }
}