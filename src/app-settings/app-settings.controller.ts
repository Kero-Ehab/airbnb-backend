import { Body, Controller, Get, Put } from "@nestjs/common";
import { AppSettingsService } from "./app-settings.service";
import { UpsertAppSettingsDto } from "./dtos/upsert-app-settings.dto";
import { AppSettingsResponseDto } from "./dtos/app-settings-response.dto";
import { Authorize } from "src/auth/decorators/roles.decorator";
import { Roles } from "src/common/constants/roles.constants";

@Controller('app-settings')
export class AppSettingsController{
    constructor(
        private readonly appSettingsService: AppSettingsService
    ){}

    @Authorize(Roles.SYSTEM_ADMIN)
    @Put()
    async upsertAppSetting(
        @Body() body: UpsertAppSettingsDto,
    ): Promise<AppSettingsResponseDto>{
        return this.appSettingsService.upsert(body);
    }

    @Authorize(Roles.SYSTEM_ADMIN)
    @Get()
    async findAppSettingsDto():Promise<AppSettingsResponseDto>{
        return this.appSettingsService.find()
    }
}