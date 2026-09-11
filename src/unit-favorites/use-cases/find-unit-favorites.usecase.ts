import { Injectable } from "@nestjs/common";
import { UnitFavoriteRepository } from "../repositories/unit-favorite.repository";



@Injectable()
export class FindUnitFavoritesUseCase {
    constructor(
        private readonly unitFavoriteRepository: UnitFavoriteRepository,
    ){}

    async execute(
        query: FindUnit
    ){}





}