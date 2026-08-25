import { BadRequestException, Injectable } from "@nestjs/common";
import { UnitRepository } from "../repositories/unit.repository";
import { CurrentUserData } from "src/auth/interfaces/principal.interface";
import { DeleteUnitPhotosDto } from "../dtos/delete-unit-photos.dto";
import { FindOneUseCase } from "./find-one.usecase";
import { CheckUnitAuthUseCase } from "./check-unit-auth.usecase";
import { FilesUploadService } from "src/files-upload/files-upload.service";

@Injectable()
export class DeleteUnitPhotosUseCase{
    constructor(
        private readonly unitRepository: UnitRepository,
        private readonly findOneUseCase: FindOneUseCase,
        private readonly checkUnitAuthUseCase:CheckUnitAuthUseCase,
        private readonly filesUploadService: FilesUploadService
    ){}

    async execute(
    unitId: string,
    currentUser: CurrentUserData,
    body: DeleteUnitPhotosDto,
  ): Promise<void> {
    const unit = await this.findOneUseCase.execute({ _id: unitId });
    this.checkUnitAuthUseCase.execute(unit.user.toString(), currentUser);

    if (!body.photos?.length){
        throw new BadRequestException('No photos provided');
    }    

    const imagesToDelete = body.photos.filter((photo) =>
        unit.photos.includes(photo)
    );

    await this.unitRepository.findByIdAndUpdate(
        unitId,
        {$pull:{photos:{$in: imagesToDelete}}},
        {returnDocument: 'after'}
    )


    await this.filesUploadService.deleteFileByUrl(imagesToDelete)
  }
} 