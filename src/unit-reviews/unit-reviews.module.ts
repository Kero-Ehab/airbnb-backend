import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ModelNames } from "src/common/data-access";
import { UnitReviewsSchema } from "./schemas/unit-reviews.schema";
import { UnitReviewsService } from "./unit-reviews.service";
import { UnitRepository } from "src/unit/repositories/unit.repository";
import { CreateUnitReviewUseCase } from "./usecases/create-unit-review.usecase";
import { FindUnitReviewsUsecase } from "./usecases/find-unit-reviews.usecase";
import { CalculateRatingAvgUseCase } from "./usecases/calculate-rating-avg.usecase";

@Module({
    imports:[
        MongooseModule.forFeature([
            {name:ModelNames.UNIT_REVIEWS, schema:UnitReviewsSchema}
        ])
    ],
    providers:[
        UnitReviewsService,
        UnitRepository,
        CreateUnitReviewUseCase,
        CalculateRatingAvgUseCase,
        FindUnitReviewsUsecase
    ],
    exports:[UnitReviewsService]
})
export class UnitReviewsModule{}