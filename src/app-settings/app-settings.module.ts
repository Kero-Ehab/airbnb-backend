import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppSettingsSchema } from "./schemas/app-settings.schema";
import { ModelNames } from "src/common/data-access";
import { AppSettingsRepository } from "./repositories/app-settings.repository";
import { UpsertAppSettingsUsecase } from "./usecases/upsert-app-settings.usecase";
import { FindAppsettingsUseCase } from "./usecases/find-app-settings.usecase";
import { AppSettingsService } from "./app-settings.service";
import { AppSettingsController } from "./app-settings.controller";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        schema: AppSettingsSchema,
        name: ModelNames.APP_SETTINGS,
      },
    ]),
  ],
  providers: [
    AppSettingsRepository,
    UpsertAppSettingsUsecase,
    FindAppsettingsUseCase,
    AppSettingsService
  ],
  controllers:[AppSettingsController],
  exports:[AppSettingsService]
})
export class AppSettingsModule {}