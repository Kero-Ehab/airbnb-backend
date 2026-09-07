import { Injectable } from "@nestjs/common";
import { UnitRepository } from "../repositories/unit.repository";
import { CheckUnitAuthUseCase } from "./check-unit-auth.usecase";
import { UnitValidationUseCase } from "./unit-validation.usecase";
import { FindOneUseCase } from "./find-one.usecase";
import { UpdateUnitDto } from "../dtos/update-unit.dto";
import { CurrentUserData } from "src/auth/interfaces/principal.interface";
import { UnitResponseDto } from "../dtos/unit-response.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class UpdateUnitUseCase{
    constructor(
        private readonly unitRepository: UnitRepository,
        private readonly checkUnitAuthUseCase: CheckUnitAuthUseCase,
        private readonly unitValidationUseCase: UnitValidationUseCase,
        private readonly findOneUseCase: FindOneUseCase,
    ){}

    async execute(
        id: string,
        body: UpdateUnitDto,
        currentUser: CurrentUserData,
    ):Promise<UnitResponseDto>{
        const unit = await this.findOneUseCase.execute({ _id: id });
        this.checkUnitAuthUseCase.execute(unit.user.toString(), currentUser)
        await this.unitValidationUseCase.execute(body);

        const updatedUnit = await this.unitRepository.findByIdAndUpdate(
            id,
            {$set: body},
            {returnDocument: 'after'}
        )
        return plainToInstance(UnitResponseDto, updatedUnit)
    }
}