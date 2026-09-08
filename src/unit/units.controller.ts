import { Controller, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { UnitsService } from "./units.service";
import { Authorize } from "src/auth/decorators/roles.decorator";
import { Roles } from "src/common/constants/roles.constants";
import { FilesInterceptor } from "@nestjs/platform-express";
import { MaxFileCount } from "src/common/files/constants/file-count.constants";





@Controller('units')
export class UnitsController{
    constructor(
        private readonly unitsService: UnitsService
    ){}

    @Authorize(Roles.USER)
    @Post()
    @UseInterceptors(FilesInterceptor('photos', MaxFileCount.UNIT_IMAGES))
    async create(
        //@UploadedFiles(createParseFilePipe())
    ){}




}