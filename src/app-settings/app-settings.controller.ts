import { Body, Controller, Get, Put } from "@nestjs/common";
import { AppSettingsService } from "./app-settings.service";
import { UpsertAppSettingsDto } from "./dtos/upsert-app-settings.dto";
import { AppSettingsResponseDto } from "./dtos/app-settings-response.dto";

@Controller('app-settings')
export class AppSettingsController{
    constructor(
        private readonly appSettingsService: AppSettingsService
    ){}

    @Put()
    async upsertAppSetting(
        @Body() body: UpsertAppSettingsDto,
    ): Promise<AppSettingsResponseDto>{
        return this.appSettingsService.upsert(body);
    }

    @Get()
    async findAppSettingsDto():Promise<AppSettingsResponseDto>{
        return this.appSettingsService.find()
    }
}