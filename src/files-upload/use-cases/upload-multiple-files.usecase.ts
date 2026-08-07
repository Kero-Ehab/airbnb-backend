import { BadRequestException, Injectable } from "@nestjs/common";
import { MulterFile } from "../types/multer-file.type";
import { uploadSingleFileUseCase } from "./upload-single-file.usecase";

@Injectable()
export class uploadMultipleFilesUseCase{
    constructor(
        private readonly uploadSingleFileUseCase:uploadSingleFileUseCase
    ){}

    async execute(files: MulterFile[]): Promise<string[]> {
        if (!files || files.length === 0) {
            throw new BadRequestException("No files provided");
        }
    
        return Promise.all(
            files.map((file)=> this.uploadSingleFileUseCase.execute(file))
        )
    
    }
}    