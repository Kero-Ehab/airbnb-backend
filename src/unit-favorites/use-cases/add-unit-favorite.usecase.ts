import { UnitsService } from "src/unit/units.service";
import { UnitFavoriteRepository } from "../repositories/unit-favorite.repository";
import { CurrentUserData } from "src/auth/interfaces/principal.interface";
import { BadRequestException, Injectable } from "@nestjs/common";

@Injectable()
export class AddUnitFavoriteUseCase{
    constructor(
        private readonly unitFavoriteRepository: UnitFavoriteRepository,
        private readonly unitsService: UnitsService,
    ) {}

  async execute(unitId: string, currentUser: CurrentUserData): Promise<void> {
    const unit = await this.unitsService.findById(unitId);

    if (unit.user.toString() === currentUser._id.toString())
      throw new BadRequestException(
        'You can’t add your units to your favourites list',
      );

    const existingFavorite = await this.unitFavoriteRepository.findOne({
      user: currentUser._id.toString(),
      unit: unitId,
    });
    if (existingFavorite) return;

    await this.unitFavoriteRepository.create({
      user: currentUser._id.toString(),
      unit: unitId,
    });
  }
}