import { CurrentUserData } from "src/auth/interfaces/principal.interface";
import { CreateUnitDto } from "../dtos/create-unit.dto";
import { UnitResponseDto } from "../dtos/unit-response.dto";
import { UnitRepository } from "../repositories/unit.repository";
import { UnitValidationUseCase } from "./unit-validation.usecase";
import { plainToInstance } from "class-transformer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateUnitUseCase{
    constructor(
        private readonly unitsRepository: UnitRepository,
        private readonly unitValidationUseCase: UnitValidationUseCase
    ){}

    async execute(
        body: CreateUnitDto,
        currentUser:CurrentUserData
    ):Promise<UnitResponseDto>{
        await this.unitValidationUseCase.execute(body)
        
        const unit = await this.unitsRepository.create({
            ...body,
            user: currentUser._id
        })
        
        return plainToInstance(UnitResponseDto, unit)
    }
}