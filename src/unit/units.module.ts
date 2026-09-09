import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ModelNames } from "src/common/data-access";
import { UnitSchema } from "./schemas/unit.schema";
import { AppSettingsModule } from "src/app-settings/app-settings.module";
import { CitiesModule } from "src/cities/cities.module";
import { CountriesModule } from "src/countries/countries.module";
import { FilesUploadModule } from "src/files-upload/files-upload.module";
import { UnitRepository } from "./repositories/unit.repository";
import { UnitValidationUseCase } from "./usecases/unit-validation.usecase";
import { CreateUnitUseCase } from "./usecases/create-unit.usecase";
import { CheckUnitAuthUseCase } from "./usecases/check-unit-auth.usecase";
import { UpdateUnitUseCase } from "./usecases/update-unit.usecase";
import { UpdateUnitAvgRateAndCountUsecase } from "./usecases/update-unit-avg-rate-and-count.usecase";
import { UpdateUnitPhotosUsecase } from "./usecases/update-unit-photos.usecase";
import { FindOneUseCase } from "./usecases/find-one.usecase";
import { FindAllUseCase } from "./usecases/find-all.usecase";
import { FindByIdUsecase } from "./usecases/find-by-id.usecase";
import { FindAllUnitsByUserUseCase } from "./usecases/find-all-by-user.usecase";
import { ActivateUnitUsecase } from "./usecases/activate-unit.usecase";
import { DeactivateUnitUsecase } from "./usecases/deactivate-unit.usecase";
import { DeleteUnitPhotosUseCase } from "./usecases/delete-unit-photos.usecase";
import { DeleteUnitUsecase } from "./usecases/delete-unit.usecase";
import { UnitCategoriesModule } from "src/unit-categories/unit-categories.module";
import { UnitsController } from "./units.controller";
import { UnitsService } from "./units.service";


@Module({
    imports:[
        MongooseModule.forFeature([
            {name:ModelNames.UNITS, schema:UnitSchema}
        ]),
        AppSettingsModule,
        CitiesModule,
        CountriesModule,
        FilesUploadModule,
        UnitCategoriesModule
    ],
    providers:[
        UnitRepository,
        UnitsService,
        UnitValidationUseCase,
        CreateUnitUseCase,
        CheckUnitAuthUseCase,
        UpdateUnitUseCase,
        UpdateUnitAvgRateAndCountUsecase,
        UpdateUnitPhotosUsecase,
        FindOneUseCase,
        FindAllUseCase,
        FindByIdUsecase,
        FindAllUnitsByUserUseCase,
        ActivateUnitUsecase,
        DeactivateUnitUsecase,
        DeleteUnitPhotosUseCase,
        DeleteUnitUsecase
    ],
    controllers:[UnitsController],
    exports:[UnitsService]
})
export class UnitsModule {}