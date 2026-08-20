import { Injectable } from "@nestjs/common";
import { UnitCategoriesRepository } from "../repository/unit-categories.repository";
import { QueryFilter } from "mongoose";
import { UnitCategories } from "../schema/unit-categories.schema";
import { UnitCategoryResponseDto } from "../dtos/unit-category-response.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class FindOneUnitCategoriesUsecase {
  constructor(
    private readonly unitCategoriesRepository: UnitCategoriesRepository,
  ) {}

  async execute(query: QueryFilter<UnitCategories>): Promise<UnitCategoryResponseDto> {
    const unitCategory = await this.unitCategoriesRepository.findOne(query);
    return plainToInstance(UnitCategoryResponseDto, unitCategory);
  }
}