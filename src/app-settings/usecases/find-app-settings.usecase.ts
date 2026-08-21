import { Injectable } from "@nestjs/common";
import { AppSettingsRepository } from "../repositories/app-settings.repository";
import { UpsertAppSettingsDto } from "../dtos/upsert-app-settings.dto";
import { AppSettingsResponseDto } from "../dtos/app-settings-response.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class UpsertAppSettingsUsecase{
    
    constructor(
        private readonly appSettingDto: AppSettingsRepository
    ){}

    async execute(body: UpsertAppSettingsDto): Promise<AppSettingsResponseDto>{
        const appSettings = await this.appSettingDto.findOneAndUpdate(
            {},
            {$set: body},
            {$upsert: true, returnDocument: 'after', lean:true}
        )
        return plainToInstance(AppSettingsResponseDto, appSettings)
    }
}