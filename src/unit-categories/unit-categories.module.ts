import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ModelNames } from "src/common/data-access";
import { UnitCategoriesSchema } from "./schema/unit-categories.schema";
import { UnitCategoriesController } from "./unit-categories.controller";
import { UnitCategoriesService } from "./unit-categories.service";
import { CreateUnitCategoryUseCase } from "./use-case/create-unit-category.usecase";
import { FindUnitCategoryByIdUsecase } from "./use-case/find-unit-category-by-id.usecase";
import { FindAllUnitCategoriesUsecase } from "./use-case/find-all-unit-categories.usecase";
import { FindOneUnitCategoriesUsecase } from "./use-case/find-one.usecase";
import { UpdateUnitCategoryUsecase } from "./use-case/update-unit-category.usecase";
import { SoftDeleteUnitCategoryUsecase } from "./use-case/soft-delete-unit-category.usecase";
import { UnitCategoriesRepository } from "./repository/unit-categories.repository";

@Module({
    imports:[
        MongooseModule.forFeature([
            { name: ModelNames.UNIT_CATEGORIES, schema:UnitCategoriesSchema }
        ])
    ],
    providers:[
        UnitCategoriesService,
        CreateUnitCategoryUseCase,
        UpdateUnitCategoryUsecase,
        SoftDeleteUnitCategoryUsecase,
        FindUnitCategoryByIdUsecase,
        FindAllUnitCategoriesUsecase,
        FindOneUnitCategoriesUsecase,
        UnitCategoriesRepository
    ],
    controllers:[UnitCategoriesController],
    exports:[UnitCategoriesService]
})
export class UnitCategoriesModule{}