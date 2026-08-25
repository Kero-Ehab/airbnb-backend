import { BadRequestException, Injectable } from "@nestjs/common";
import { UnitRepository } from "../repositories/unit.repository";
import { CurrentUserData } from "src/auth/interfaces/principal.interface";
import { FindOneUseCase } from "./find-one.usecase";
import { CheckUnitAuthUseCase } from "./check-unit-auth.usecase";
import { plainToInstance } from "class-transformer";
import { UnitResponseDto } from "../dtos/unit-response.dto";

@Injectable()
export class ActivateUnitUsecase{

    constructor(
        private readonly unitRepository: UnitRepository,
        private readonly findOneUseCase: FindOneUseCase,
        private readonly checkUnitAuthUseCase: CheckUnitAuthUseCase
    ){}

    async execute(
        unitId: string,
        currentUser:CurrentUserData
    ):Promise<UnitResponseDto>{
        const unit = await this.findOneUseCase.execute({_id: unitId});
        this.checkUnitAuthUseCase.execute(unit.user.toString(), currentUser)
        
        if(unit.isDeleted){
            throw new BadRequestException('Unit is deleted');
        }

        const updatedUnit = await this.unitRepository.findByIdAndUpdate(
            unitId,
            {isActive: true},
            {returnDocument: 'after', lean: true}
        )
        return plainToInstance(UnitResponseDto, updatedUnit)
    }
}