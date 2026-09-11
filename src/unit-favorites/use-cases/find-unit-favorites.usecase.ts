import { Injectable } from '@nestjs/common';
import { UnitFavoriteRepository } from '../repositories/unit-favorite.repository';
import { CurrentUserData } from '../../auth/interfaces/principal.interface';
import { FindUnitFavoritesDto } from '../dtos/find-unit-favorites.dto';
import { PipelineStage, Types } from 'mongoose';
import { ModelNames, PaginationResult } from '../../common/data-access';
import { UnitFavoriteResponseDto } from '../dtos/unit-favorite-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FindUnitFavoritesUseCase {
  constructor(
    private readonly unitFavoriteRepository: UnitFavoriteRepository,
  ) {}

  async execute(
    query: FindUnitFavoritesDto,
    currentUser: CurrentUserData,
  ): Promise<PaginationResult<UnitFavoriteResponseDto>> {
    const pipeline: PipelineStage[] = [
      {
        $match: {
          user: currentUser._id.toString(),
        },
      },
      { $sort: { createdAt: -1 } }, // first = 3 matches - 3 documents
      { $addFields: { unitObjectId: { $toObjectId: '$unit' } } },
      {
        $lookup: {
          from: ModelNames.UNITS,
          localField: 'unitObjectId',
          foreignField: '_id',
          as: 'unit',
        },
      },
      { $unwind: '$unit' },
      { $replaceRoot: { newRoot: '$unit' } },
      { $match: { isDeleted: { $ne: true }, isActive: { $ne: false } } },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          costPerDay: 1,
          photos: 1,
        },
      },
    ];

    const result =
      await this.unitFavoriteRepository.paginatedAggregation<UnitFavoriteResponseDto>(
        pipeline,
        {
          page: query?.page,
          limit: query?.limit,
          ignoreLimit: query?.ignoreLimit,
        },
      );

    return plainToInstance(PaginationResult<UnitFavoriteResponseDto>, result);
    }
}