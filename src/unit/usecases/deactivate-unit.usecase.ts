import { BadRequestException, Injectable } from "@nestjs/common";
import { UnitRepository } from "../repositories/unit.repository";
import { FindOneUseCase } from "./find-one.usecase";
import { CheckUnitAuthUseCase } from "./check-unit-auth.usecase";
import { CurrentUserData } from "src/auth/interfaces/principal.interface";
import { UnitResponseDto } from "../dtos/unit-response.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class DeactivateUnitUsecase{
    constructor(
        private readonly unitRepository: UnitRepository,
        private readonly findOneUseCase: FindOneUseCase,
        private readonly checkUnitAuthUsecase: CheckUnitAuthUseCase
    ){}

    async execute(
        unitId: string,
        currentUser: CurrentUserData
    ):Promise<UnitResponseDto>{
        const unit = await this.findOneUseCase.execute({_id:unitId})
        this.checkUnitAuthUsecase.execute(unit.user.toString(), currentUser)
    
        if(unit.isDeleted){
            throw new BadRequestException('Unit is deleted');
        }
        
        const updatedUnit = await this.unitRepository.findByIdAndUpdate(
            unitId,
            {isActive: false},
            {returnDocument: 'after', lean: true}
        )
        
        return plainToInstance(UnitResponseDto, updatedUnit)
    }
}