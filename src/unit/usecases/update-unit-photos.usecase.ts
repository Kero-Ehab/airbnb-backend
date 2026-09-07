import { Injectable } from "@nestjs/common";
import { UnitRepository } from "../repositories/unit.repository";
import { CheckUnitAuthUseCase } from "./check-unit-auth.usecase";
import { FindOneUseCase } from "./find-one.usecase";
import { FilesUploadService } from "src/files-upload/files-upload.service";
import { CurrentUserData } from "src/auth/interfaces/principal.interface";
import { MulterFile } from "src/files-upload/types/multer-file.type";
import { UnitResponseDto } from "../dtos/unit-response.dto";
import { UpdateUnitPhotosDto } from "../dtos/update-unit-photos.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class UpdateUnitPhotosUsecase{

    constructor(
        private readonly unitRepository:UnitRepository,
        private readonly checkUnitAuthUseCase: CheckUnitAuthUseCase,
        private readonly findOneUseCase: FindOneUseCase,
        private readonly filesUploadService: FilesUploadService
    ){}

    async execute(
        id: string,
        currentUser: CurrentUserData,
        photos: MulterFile[],
    ): Promise<UnitResponseDto>{
        const body: UpdateUnitPhotosDto = {};
        const unit = await this.findOneUseCase.execute({_id: id});
        this.checkUnitAuthUseCase.execute(unit.user.toString(), currentUser);
        body.photos = await this.filesUploadService.uploadMultipleFiles(photos);
        const updatedUnit = await this.unitRepository.findByIdAndUpdate(
            id,
            {$addToSet:{photos:{$each: body.photos}}},
            {returnDocument: 'after', lean: true},
        )   
        return plainToInstance(UnitResponseDto, updatedUnit)
    }
}