import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CountriesServices } from "./countries.service";
import { Authorize } from "src/auth/decorators/roles.decorator";
import { Roles } from "src/common/constants/roles.constants";
import { CreateCountryDto } from "./dtos/create-country.dto";
import { CountryResposeDTo } from "./dtos/country-response.dto";
import { CountryIdDto } from "./dtos/country-id.dto";
import { UpdateCountryDto } from "./dtos/update-country.dto";
import { FindAllDto } from "./dtos/find-all.dto";
import { PaginationResult } from "src/common/data-access";


@Controller('countries')
export class CountriesController{

    constructor(
        private readonly countriesService: CountriesServices
    ) {}


    @Post()
    @Authorize(Roles.SYSTEM_ADMIN)
    async create(@Body() body: CreateCountryDto):Promise<CountryResposeDTo>{
        return this.countriesService.create(body)
    }
    
    @Patch('/:id')
    @Authorize(Roles.SYSTEM_ADMIN)
    async update(
        @Param() param: CountryIdDto,
        @Body() body: UpdateCountryDto 
    ):Promise<CountryResposeDTo>{
        return this.countriesService.updateById(param.id, body)
    }
    
    @Delete('/:id')
    @Authorize(Roles.SYSTEM_ADMIN)
    async deleteCountryById(
        @Param() param: CountryIdDto
    ):Promise<void>{
        return this.countriesService.deleteById(param.id)
    }

    @Get('/:id')
    async getCountryById(
        @Param() param:CountryIdDto
    ):Promise<CountryResposeDTo>{
        return this.countriesService.getCountryById(param.id)
    }

    @Get()
    async findAll(
        @Query() query:FindAllDto
    ): Promise<PaginationResult<CountryResposeDTo>>{
        return this.countriesService.findAll(query)
    }
}