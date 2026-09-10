import { UnitFavoriteRepository } from '../repositories/unit-favorite.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CurrentUserData } from '../../auth/interfaces/principal.interface';

@Injectable()
export class RemoveUnitFavoriteUseCase {
  constructor(
    private readonly unitFavoriteRepository: UnitFavoriteRepository,
  ) {}

  async execute(unitId: string, user: CurrentUserData): Promise<void> {
    const deletedFavorite = await this.unitFavoriteRepository.findOneAndDelete({
      unit: unitId,
      user: user._id.toString(),
    });

    if (!deletedFavorite) throw new BadRequestException('Favorite not found');
  }
}