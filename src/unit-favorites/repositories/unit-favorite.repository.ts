import { Injectable } from "@nestjs/common";
import { BaseRepository, ModelNames } from "src/common/data-access";
import { UnitFavorit } from "../schemas/unit-favorite.schema";
import { InjectModel } from "@nestjs/mongoose";
import { HydratedDocument, Model } from "mongoose";

@Injectable()
export class UnitFavoriteRepository extends BaseRepository<UnitFavorit>{
    constructor(
        @InjectModel(ModelNames.UNIT_FAVORITES)
        private readonly unitFavoritesModel: Model<HydratedDocument<UnitFavorit>>
    ){
        super(unitFavoritesModel)
    }
}