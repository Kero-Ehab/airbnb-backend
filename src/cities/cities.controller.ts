import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CitiesService } from "./cities.service";
import { CreateCityDto } from "./dtos/create-city.dto";
import { CityResponseDto } from "./dtos/city-response.dto";
import { UpdateCityDto } from "./dtos/update-city.dto";
import { FindAllCitiesDto } from "./dtos/find-all-cities.dto";
import { PaginationResult } from "src/common/data-access";
import { Authorize } from "src/auth/decorators/roles.decorator";
import { Roles } from "src/common/constants/roles.constants";

@Controller('cities')
export class CitiesController{
    constructor(
        private readonly citiesService:CitiesService
    ){}

    @Authorize(Roles.SYSTEM_ADMIN)
    @Post()
    async createCity(@Body() body: CreateCityDto):Promise<CityResponseDto>{
        return this.citiesService.createCity(body)
    }

    @Authorize(Roles.SYSTEM_ADMIN)
    @Patch('/:id')
    async updateCity(
        @Param('id') cityId: string,
        @Body() body: UpdateCityDto
    ):Promise<CityResponseDto>{
        return this.citiesService.updateCity(cityId, body)
    }

    @Authorize(Roles.SYSTEM_ADMIN)
    @Delete('/:id')
    async deleteCity(
        @Param('id') cityId: string
    ):Promise<void>{
        return this.citiesService.delete(cityId)
    }

    @Get()
    async findAllCities(
        @Query() query:FindAllCitiesDto
    ):Promise<PaginationResult<CityResponseDto>>{
        return this.citiesService.findAll(query)
    }

    @Get('/:id')
    async findCityById(@Param('id') cityId: string):Promise<CityResponseDto>{
        return this.citiesService.findCityById(cityId)
    }
}