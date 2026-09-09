import { Injectable } from "@nestjs/common";
import { BaseRepository, ModelNames } from "src/common/data-access";
import { UnitReviews } from "../schemas/unit-reviews.schema";
import { InjectModel } from "@nestjs/mongoose";
import { HydratedDocument, Model } from "mongoose";

@Injectable()
export class UnitReviewsRepository extends BaseRepository<UnitReviews>{
    constructor(
        @InjectModel(ModelNames.UNIT_REVIEWS)
        private readonly unitReviewsModel: Model<HydratedDocument<UnitReviews>>
    ){
        super(unitReviewsModel)
    }
}