import { Module } from '@nestjs/common';
import { UnitFavoritesService } from './unit-favorites.service';
import { UnitFavoritesController } from './unit-favorites.controller';
import { UnitFavoriteRepository } from './repositories/unit-favorite.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNames } from '../common/data-access';
import { AddUnitFavoriteUseCase } from './use-cases/add-unit-favorite.usecase';
import { FindUnitFavoritesUseCase } from './use-cases/find-unit-favorites.usecase';
import { RemoveUnitFavoriteUseCase } from './use-cases/remove-unit-favorite.usecase';
import { UnitFavoritSchema } from './schemas/unit-favorite.schema';
import { UnitsModule } from 'src/unit/units.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelNames.UNIT_FAVORITES, schema: UnitFavoritSchema },
    ]),
    UnitsModule,
  ],
  providers: [
    UnitFavoritesService,
    UnitFavoriteRepository,
    AddUnitFavoriteUseCase,
    FindUnitFavoritesUseCase,
    RemoveUnitFavoriteUseCase,
  ],
  controllers: [UnitFavoritesController],
})
export class UnitFavoritesModule {}