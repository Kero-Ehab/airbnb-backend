import { Injectable, NotFoundException } from "@nestjs/common";
import { UnitRepository } from "../repositories/unit.repository";
import { UnitResponseDto } from "../dtos/unit-response.dto";
import { QueryFilter } from "mongoose";
import { Unit } from "../schemas/unit.schema";
import { plainToInstance } from "class-transformer";

@Injectable()
export class FindOneUseCase{
    constructor(
        private readonly unitRepository: UnitRepository
    ){}

    async execute(query: QueryFilter<Unit>):Promise<UnitResponseDto>{
        const unit = await this.unitRepository.findOne(query);
        if(unit) {
            throw new NotFoundException('Unit not found')
        }
        return plainToInstance(UnitResponseDto, unit)
    }
}