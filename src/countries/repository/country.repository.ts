import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { HydratedDocument, Model } from "mongoose";
import { BaseRepository, ModelNames } from "src/common/data-access";
import { Country } from "../schema/country.schema";

@Injectable()
export class CountryRepository extends BaseRepository<Country>{
    constructor(
        @InjectModel(ModelNames.COUNTRIES)
        private readonly countryModel: Model<HydratedDocument<Country>>
    ){
        super(countryModel)
    }
}