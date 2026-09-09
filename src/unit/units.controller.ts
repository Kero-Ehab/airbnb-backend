import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { UnitsService } from "./units.service";
import { Authorize } from "src/auth/decorators/roles.decorator";
import { Roles } from "src/common/constants/roles.constants";
import { FilesInterceptor } from "@nestjs/platform-express";
import { MaxFileCount } from "src/common/files/constants/file-count.constants";
import { createParseFilePipe } from "src/common/files/files-validation-factory";
import { MulterFile } from "src/files-upload/types/multer-file.type";
import { CreateUnitDto } from "./dtos/create-unit.dto";
import { CurrentAccount, Principal } from "src/auth/decorators/current-account.decorator";
import { FilesUploadService } from "src/files-upload/files-upload.service";
import { UpdateUnitDto } from "./dtos/update-unit.dto";
import { UnitResponseDto } from "./dtos/unit-response.dto";
import { Public } from "src/auth/decorators/public.decorators";
import { FindAllUnitsDto } from "./dtos/find-all-units.dto";
import { PaginationResult } from "src/common/data-access";
import { DeleteUnitPhotosDto } from "./dtos/delete-unit-photos.dto";

@Controller('units')
export class UnitsController{
    constructor(
        private readonly unitsService: UnitsService,
        private readonly filesUploadService: FilesUploadService
    ){}

    @Authorize(Roles.USER)
    @Post()
    @UseInterceptors(FilesInterceptor('photos', MaxFileCount.UNITS_IMAGES))
    async create(
        @UploadedFiles(createParseFilePipe('2MB',['png', 'jpeg', 'jpg']))
        photos: MulterFile[],
        @Body() body: CreateUnitDto,
        @CurrentAccount() principal: Principal
    ):Promise<UnitResponseDto>{
        body.photos = await this.filesUploadService.uploadMultipleFiles(photos)
        return await this.unitsService.create(body, principal.user)
    }

    @Authorize(Roles.USER)
    @Patch('/:id')
    async update(
        @Param('id') id:string,
        @Body() body: UpdateUnitDto,
        @CurrentAccount() principal: Principal,
    ):Promise<UnitResponseDto>{
        return this.unitsService.update(id, body, principal.user)
    }

    @Public()
    @Get()
    async findAll(
        @Query() query: FindAllUnitsDto,
    ): Promise<PaginationResult<UnitResponseDto>> {
        return this.unitsService.findAll(query);
    }

    @Authorize(Roles.USER)
    @Get('/me')
    async findAllByUser(
        @Query() query: FindAllUnitsDto,
        @CurrentAccount() principal: Principal,
    ): Promise<PaginationResult<UnitResponseDto>> {
        return this.unitsService.findAllByUser(query, principal.user);
    }

    @Public()
    @Get('/:id')
    async findById(@Param('id') id: string): Promise<UnitResponseDto> {
        return this.unitsService.findById(id);
    }    

    @Authorize(Roles.USER)
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Param('id') id: string,
        @CurrentAccount() principal: Principal,
    ): Promise<void> {
        return this.unitsService.softDelete(id, principal.user);
    }

    @Authorize(Roles.USER)
    @Patch('/:id/activate')
    async activate(
        @Param('id') id: string,
        @CurrentAccount() principal: Principal,
    ): Promise<UnitResponseDto> {
        return this.unitsService.activate(id, principal.user);
    }

    @Authorize(Roles.USER)
    @Patch('/:id/deactivate')
    async deactivate(
        @Param('id') id: string,
        @CurrentAccount() principal: Principal,
    ): Promise<UnitResponseDto> {
        return this.unitsService.deactivate(id, principal.user);
    }

    @Authorize(Roles.USER)
    @Delete('/:id/photos')
    async deletePhotos(
        @Param('id') id: string,
        @CurrentAccount() principal: Principal,
        @Body() body: DeleteUnitPhotosDto,
    ): Promise<void> {
        return this.unitsService.deleteUnitPhotos(id, principal.user, body);
    }

    @Authorize(Roles.USER)
    @Patch('/:id/photos')
    @UseInterceptors(FilesInterceptor('photos', MaxFileCount.UNITS_IMAGES))
    async updatePhotos(
        @UploadedFiles(createParseFilePipe('2MB', ['png', 'jpeg', 'jpg']))
        photos: MulterFile[],
        @Param('id') id: string,
        @CurrentAccount() principal: Principal,
    ): Promise<UnitResponseDto> {
        // we need check current user auth first before update
        // body.photos = await this.filesUploadService.uploadMultipleFiles(photos);
        return this.unitsService.updateUnitPhotos(id, principal.user, photos);
    }
}