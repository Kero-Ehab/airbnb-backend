import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { UnitCategoriesService } from "./unit-categories.service";
import { Authorize } from "src/auth/decorators/roles.decorator";
import { Roles } from "src/common/constants/roles.constants";
import { CreateUnitCategoryDto } from "./dtos/create-unit-category.dto";
import { UnitCategoryResponseDto } from "./dtos/unit-category-response.dto";
import { UnitCategoryIdDto } from "./dtos/unit-category-id.dto";
import { UpdateUnitCategoryDto } from "./dtos/update-unit-category.dto";
import { PaginationResult } from "src/common/data-access";
import { FindAllDto } from "./dtos/find-all.dto";

@Controller('unit-categories')
export class UnitCategoriesController{
    constructor(
        private readonly unitCategoriesService: UnitCategoriesService
    ){}

    @Authorize(Roles.SYSTEM_ADMIN)
    @Post()
    async create(
        @Body() body: CreateUnitCategoryDto,
    ): Promise<UnitCategoryResponseDto> {
        return this.unitCategoriesService.create(body);
    }

    @Authorize(Roles.SYSTEM_ADMIN)
    @Patch('/:id')
    async update(
        @Param() param: UnitCategoryIdDto,
        @Body() body: UpdateUnitCategoryDto,
    ): Promise<UnitCategoryResponseDto> {
        return this.unitCategoriesService.updateById(param.id, body);
    }

    @Authorize(Roles.SYSTEM_ADMIN)
    @Delete('/:id')
    async deleteUnitCategoryById(
        @Param() param: UnitCategoryIdDto,
    ): Promise<void> {
        return this.unitCategoriesService.softDeleteById(param.id);
    }

    @Get()
    async findAll(
        @Query() query: FindAllDto,
    ): Promise<PaginationResult<UnitCategoryResponseDto>> {
        return this.unitCategoriesService.findAll(query);
    }

    @Get()
    async findById(
        @Param() param: UnitCategoryIdDto
    ): Promise<UnitCategoryResponseDto>{
        return this.unitCategoriesService.findById(param.id)
    }
}