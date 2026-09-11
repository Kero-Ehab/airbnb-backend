import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Query } from "@nestjs/common";
import { Authorize } from "src/auth/decorators/roles.decorator";
import { Roles } from "src/common/constants/roles.constants";
import { UnitFavoritesService } from "./unit-favorites.service";
import { CurrentAccount, Principal } from "src/auth/decorators/current-account.decorator";
import { FindUnitFavoritesDto } from "./dtos/find-unit-favorites.dto";
import { PaginationResult } from "src/common/data-access";
import { UnitFavoriteResponseDto } from "./dtos/unit-favorite-response.dto";

@Controller('unit-favorites')
@Authorize(Roles.USER)
export class UnitFavoritesController {
  constructor(private readonly unitFavoritesService: UnitFavoritesService) {}

  @Post('/:unitId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async addFavorite(
    @Param('unitId') unitId: string,
    @CurrentAccount() principal: Principal,
  ): Promise<void> {
    return this.unitFavoritesService.addFavorite(unitId, principal.user);
  }

  @Delete('/:unitId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeFavorite(
    @Param('unitId') unitId: string,
    @CurrentAccount() principal: Principal,
  ): Promise<void> {
    return this.unitFavoritesService.removeFavorite(unitId, principal.user);
  }

   @Get()
  async getFavorites(
    @Query() query: FindUnitFavoritesDto,
    @CurrentAccount() principal: Principal,
  ): Promise<PaginationResult<UnitFavoriteResponseDto>> {
    return this.unitFavoritesService.getFavorites(query, principal.user);
  }
}