import { Injectable } from "@nestjs/common";
import { CreateUnitCategoryUseCase } from "./use-case/create-unit-category.usecase";
import { FindUnitCategoryByIdUsecase } from "./use-case/find-unit-category-by-id.usecase";
import { FindAllUnitCategoriesUsecase } from "./use-case/find-all-unit-categories.usecase";
import { SoftDeleteUnitCategoryUsecase } from "./use-case/soft-delete-unit-category.usecase";
import { UpdateUnitCategoryUsecase } from "./use-case/update-unit-category.usecase";
import { FindOneUnitCategoriesUsecase } from "./use-case/find-one.usecase";
import { CreateUnitCategoryDto } from "./dtos/create-unit-category.dto";
import { UnitCategoryResponseDto } from "./dtos/unit-category-response.dto";
import { UpdateUnitCategoryDto } from "./dtos/update-unit-category.dto";
import { PaginationResult } from "src/common/data-access";
import { FindAllDto } from "./dtos/find-all.dto";

@Injectable()
export class UnitCategoriesService{

    constructor(
        private readonly createUnitCategoryUsecase: CreateUnitCategoryUseCase,
        private readonly findUnitCategoryByIdUsecase: FindUnitCategoryByIdUsecase,
        private readonly findAllUnitCategoriesUsecase: FindAllUnitCategoriesUsecase,
        private readonly softDeleteUnitCategoryUsecase: SoftDeleteUnitCategoryUsecase,
        private readonly updateUnitCategoryUsecase: UpdateUnitCategoryUsecase,
        private readonly findOneUnitCategoryUsecase: FindOneUnitCategoriesUsecase 
    ){}

    async create(body: CreateUnitCategoryDto):Promise<UnitCategoryResponseDto>{
        return this.createUnitCategoryUsecase.execute(body)
    }

    async updateById(
        id: string,
        body: UpdateUnitCategoryDto
    ):Promise<UnitCategoryResponseDto>{
        return this.updateUnitCategoryUsecase.execute(id, body)
    }

    async softDeleteById(id: string):Promise<void>{
        return this.softDeleteUnitCategoryUsecase.execute(id)
    }

    async findAll(query:FindAllDto):Promise<PaginationResult<UnitCategoryResponseDto>>{
        return this.findAllUnitCategoriesUsecase.execute(query)
    }

    async findById(id: string):Promise<UnitCategoryResponseDto>{
        return this.findUnitCategoryByIdUsecase.execute(id)
    }
}