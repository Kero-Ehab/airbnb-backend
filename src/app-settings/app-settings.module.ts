import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppSettingsSchema } from "./schemas/app-settings.schema";
import { ModelNames } from "src/common/data-access";
import { AppSettingsRepository } from "./repositories/app-settings.repository";

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
  ],
  
})
export class AppSettingsModule {}