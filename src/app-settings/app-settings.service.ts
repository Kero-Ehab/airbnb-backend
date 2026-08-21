import { Injectable } from "@nestjs/common";
import { FindAppsettingsUseCase } from "./usecases/find-app-settings.usecase";
import { UpsertAppSettingsUsecase } from "./usecases/upsert-app-settings.usecase";
import { AppSettingsResponseDto } from "./dtos/app-settings-response.dto";
import { UpsertAppSettingsDto } from "./dtos/upsert-app-settings.dto";

@Injectable()
export class AppSettingsService{
    constructor(
        private readonly upsertAppSettingsUseCase: UpsertAppSettingsUsecase,
        private readonly findAppSettingsUseCase: FindAppsettingsUseCase
    ){}

    async upsert(body: UpsertAppSettingsDto): Promise<AppSettingsResponseDto>{
        return this.upsertAppSettingsUseCase.execute(body)
    }

    async find(): Promise<AppSettingsResponseDto>{
        return this.findAppSettingsUseCase.execute()
    }
}