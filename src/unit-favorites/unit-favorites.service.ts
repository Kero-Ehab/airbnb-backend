import { Injectable } from '@nestjs/common';
import { CurrentUserData } from '../auth/interfaces/principal.interface';
import { FindUnitFavoritesDto } from './dtos/find-unit-favorites.dto';
import { RemoveUnitFavoriteUseCase } from './use-cases/remove-unit-favorite.usecase';
import { AddUnitFavoriteUseCase } from './use-cases/add-unit-favorite.usecase';
import { FindUnitFavoritesUseCase } from './use-cases/find-unit-favorites.usecase';
import { PaginationResult } from '../common/data-access';
import { UnitFavoriteResponseDto } from './dtos/unit-favorite-response.dto';

@Injectable()
export class UnitFavoritesService {
  constructor(
    private readonly addUnitFavoriteUseCase: AddUnitFavoriteUseCase,
    private readonly removeUnitFavoriteUseCase: RemoveUnitFavoriteUseCase,
    private readonly findUnitFavoritesUseCase: FindUnitFavoritesUseCase,
  ) {}

  async addFavorite(unitId: string, user: CurrentUserData): Promise<void> {
    return this.addUnitFavoriteUseCase.execute(unitId, user);
  }

  async removeFavorite(unitId: string, user: CurrentUserData): Promise<void> {
    return this.removeUnitFavoriteUseCase.execute(unitId, user);
  }

  async getFavorites(
    query: FindUnitFavoritesDto,
    user: CurrentUserData,
  ): Promise<PaginationResult<UnitFavoriteResponseDto>> {
    return this.findUnitFavoritesUseCase.execute(query, user);
  }
}