import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { existsSync, unlinkSync } from "fs";
import { join } from "path";
import { BadRequestExeption } from "src/common/errors-handling/custom-exceptions/bad-request.exception";

@Injectable()
export class DeleteFileByUrlUseCase{

    async execute(url: string | string[]): Promise<void>{
        const urls = Array.isArray(url) ? url : [url];
        await Promise.all(urls.map((singleUrl) => this.deleteOne(singleUrl)));
    }

    private async deleteOne(fileUrl: string): Promise<void>{
        const filePath = this.extractPathFromUrl(fileUrl)
        if(!filePath || !existsSync(filePath)){
            throw new BadRequestExeption(`File not found: ${fileUrl}`)
        }
        try {
            await unlinkSync(filePath)
        } catch (error) {
            throw new InternalServerErrorException(`Failed to delete file: ${fileUrl}`);
        }
    }

    private extractPathFromUrl(fileUrl: string): string | null{
        try {
            const url = new URL(fileUrl);
            return join(process.cwd(), url.pathname)
        } catch (error) {
            return null
        }
    }
}