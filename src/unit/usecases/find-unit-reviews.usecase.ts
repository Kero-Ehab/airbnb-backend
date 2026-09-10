import { Injectable } from "@nestjs/common";
import { PaginationResult } from "src/common/data-access";
import { UnitReviewsService } from "src/unit-reviews/unit-reviews.service";
import { UnitReviewDto } from "../dtos/unit-reviews.dto";
import { PaginationDto } from "src/common/data-access/dto/pagination.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class FindUnitReviewsUsecase {
  constructor(private readonly unitReviewsService: UnitReviewsService) {}

  async execute(
    unitId: string,
    query:PaginationDto
  ):Promise<PaginationResult<UnitReviewDto>>{
    const result = await this.unitReviewsService.findUnitReviews({
        unit: unitId,
        ...query
    })
        return plainToInstance(PaginationResult<UnitReviewDto>, result)
    }
}