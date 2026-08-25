import { Injectable } from "@nestjs/common";
import { CheckUnitAuthUseCase } from "./check-unit-auth.usecase";
import { FindOneUseCase } from "./find-one.usecase";
import { UnitRepository } from "../repositories/unit.repository";
import { CurrentUserData } from "src/auth/interfaces/principal.interface";

@Injectable()
export class DeleteUnitUsecase{
    constructor(
        private readonly unitRepository: UnitRepository,
        private readonly findOneUseCase: FindOneUseCase,
        private readonly checkUnitAuthUseCase: CheckUnitAuthUseCase,
    ){}

    async execute(
        unitId: string,
        currentUser:CurrentUserData
    ):Promise<void>{
        const unit = await this.findOneUseCase.execute({_id: unitId})
        this.checkUnitAuthUseCase.execute(unit.user.toString(), currentUser)
        
        await this.unitRepository.findByIdAndUpdate(
            unitId,
            {isDeleted: true},
            {returnDocument:'after'}
        )
    }
}