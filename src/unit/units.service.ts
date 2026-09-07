import { Injectable } from "@nestjs/common";
import { CreateUnitUseCase } from "./usecases/create-unit.usecase";
import { UpdateUnitUseCase } from "./usecases/update-unit.usecase";
import { FindAllUseCase } from "./usecases/find-all.usecase";
import { FindByIdUsecase } from "./usecases/find-by-id.usecase";
import { FindAllUnitsByUserUseCase } from "./usecases/find-all-by-user.usecase";
import { DeleteUnitUsecase } from "./usecases/delete-unit.usecase";
import { ActivateUnitUsecase } from "./usecases/activate-unit.usecase";
import { DeactivateUnitUsecase } from "./usecases/deactivate-unit.usecase";
import { DeleteUnitPhotosUseCase } from "./usecases/delete-unit-photos.usecase";
import { UpdateUnitPhotosUsecase } from "./usecases/update-unit-photos.usecase";
import { UpdateUnitAvgRateAndCountUsecase } from "./usecases/update-unit-avg-rate-and-count.usecase";
import { UnitResponseDto } from "./dtos/unit-response.dto";
import { CreateUnitDto } from "./dtos/create-unit.dto";
import { CurrentUserData } from "src/auth/interfaces/principal.interface";
import { UpdateUnitDto } from "./dtos/update-unit.dto";
import { FindAllUnitsDto } from "./dtos/find-all-units.dto";
import { PaginationResult } from "src/common/data-access";
import { DeleteUnitPhotosDto } from "./dtos/delete-unit-photos.dto";
import { MulterFile } from "src/files-upload/types/multer-file.type";
import { UpdateUnitAvgRateAndCountDto } from "./dtos/update-unit-avg-rate-and-count.dto";
import { ClientSession } from "mongoose";

@Injectable()
export class UnitsService{
    constructor(
        private readonly createUnitUseCase:CreateUnitUseCase,
        private readonly updateUnitUseCase: UpdateUnitUseCase,
        private readonly findAllUseCase: FindAllUseCase,
        private readonly findByIdUsecase: FindByIdUsecase,
        private readonly findAllByUserUseCase: FindAllUnitsByUserUseCase,
        private readonly deleteUnitUsecase: DeleteUnitUsecase,
        private readonly activateUnitUsecase: ActivateUnitUsecase,
        private readonly deactivateUnitUsecase: DeactivateUnitUsecase,
        private readonly deleteUnitPhotosUseCase: DeleteUnitPhotosUseCase,
        private readonly updateUnitPhotosUsecase: UpdateUnitPhotosUsecase,
        private readonly updateUnitAvgRateAndCountUsecase: UpdateUnitAvgRateAndCountUsecase,
    ){}

    async create(
        body: CreateUnitDto,
        currentUser: CurrentUserData
    ):Promise<UnitResponseDto>{
        return await this.createUnitUseCase.execute(body, currentUser)
    }

    async update(
        id: string,
        body: UpdateUnitDto,
        currentUser: CurrentUserData
    ):Promise<UnitResponseDto>{
        return await this.updateUnitUseCase.execute(id, body, currentUser)
    }

    async findAll(
        query: FindAllUnitsDto
    ):Promise<PaginationResult<UnitResponseDto>>{
        return this.findAllUseCase.execute(query)
    }

    async findById(id: string): Promise<UnitResponseDto>{
        return this.findByIdUsecase.execute(id)
    }

    async findAllByUser(
        query: FindAllUnitsDto,
        user: CurrentUserData
    ):Promise<PaginationResult<UnitResponseDto>>{
        return this.findAllByUserUseCase.execute(query, user)
    }

    async softDelete(
        unitId: string,
        currentUser: CurrentUserData,
    ):Promise<void>{
        return this.deleteUnitUsecase.execute(unitId, currentUser)
    }

    async activate(
        unitId: string,
        currentUser: CurrentUserData
    ):Promise<UnitResponseDto>{
        return this.activateUnitUsecase.execute(unitId, currentUser)
    }

    async deactivate(
        unitId: string,
        currentUser: CurrentUserData
    ):Promise<UnitResponseDto>{
        return this.deactivateUnitUsecase.execute(unitId, currentUser)
    }

    async deleteUnitPhotos(
        id: string,
        user: CurrentUserData,
        body:DeleteUnitPhotosDto
    ):Promise<void>{
        await this.deleteUnitPhotosUseCase.execute(id, user, body);
    }

    async updateUnitPhotos(
        id:string,
        user:CurrentUserData,
        photos: MulterFile[],
    ):Promise<UnitResponseDto>{
        return this.updateUnitPhotosUsecase.execute(id, user, photos)
    }

    async updateUnitAvgRateAndCount(
        body: UpdateUnitAvgRateAndCountDto,
        session?:ClientSession
    ):Promise<void>{
        await this.updateUnitAvgRateAndCountUsecase.execute(body, session)
    }
}