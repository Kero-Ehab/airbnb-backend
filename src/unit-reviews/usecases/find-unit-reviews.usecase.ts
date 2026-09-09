import { Injectable } from "@nestjs/common";
import { UnitReviewsRepository } from "../repositories/unit-reviews.repository";
import { FindUnitReviewDto } from "../dtos/find-unit-reviews.dto";
import { PaginationResult } from "src/common/data-access";
import { FindUnitReviewResponseDto } from "../dtos/find-unit-review-response.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class FindUnitReviewsUsecase {
    constructor(
        private readonly unitReviewsRepository: UnitReviewsRepository
    ){}

    async execute(
        query: FindUnitReviewDto
    ):Promise<PaginationResult<FindUnitReviewResponseDto>>{
        const result = await this.unitReviewsRepository.findPaginated(
            {
                unit: query.unit,
            },
            {
                select: '-booking -unit -__v -updatedAt',
                page: query?.page,
                limit: query?.limit,
                ignoreLimit: query?.ignoreLimit,
                lean: true,

                populate:[{path:'guest', select: 'name'}]
            },
        );
        return plainToInstance(PaginationResult<FindUnitReviewResponseDto>, result)
    }
}