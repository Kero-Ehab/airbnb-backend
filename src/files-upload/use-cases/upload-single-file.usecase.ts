import { Injectable } from "@nestjs/common";
import { MulterFile } from "../types/multer-file.type";
import { BadRequestExeption } from "src/common/errors-handling/custom-exceptions/bad-request.exception";


@Injectable()
export class uploadSingleFileUseCase{

    private readonly baseUrl = process.env.APP_BASE_URL;

    async execute(file:MulterFile):Promise<string>{
        if(!file){
            throw new BadRequestExeption("NO File Provided")
        }
        return this.buildPublicUrl(file.filename);
    }

    private buildPublicUrl(filename: string): string {
        return `${this.baseUrl}/uploads/${filename}`;
    }
}