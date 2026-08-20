import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { HydratedDocument, Model } from "mongoose";
import { BaseRepository, ModelNames } from "src/common/data-access";
import { UnitCategories } from "../schema/unit-categories.schema";

@Injectable()
export class UnitCategoriesRepositry extends BaseRepository<UnitCategories>{
    constructor(
        @InjectModel(ModelNames.UNIT_CATEGORIES)
        private readonly unitCategoriesModel: Model<HydratedDocument<UnitCategories>>
    ){
        super(unitCategoriesModel)
    }
}