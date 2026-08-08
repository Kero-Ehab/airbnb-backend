import { Body, Controller, Delete, Post, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesUploadService } from "./files-upload.service";
import type { MulterFile } from "./types/multer-file.type";
import { diskStorage } from "multer";
import { extname, join } from "path";
import {v4 as uuidv4} from "uuid"
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";


const storageConfig = diskStorage({
  destination: join(process.cwd(), "uploads"),
  filename: (req, file, callback) =>{
    const uniqueName = `${uuidv4()}${extname(file.originalname)}`
    callback(null, uniqueName)
  }
})


@Controller('files')
export class FilesUploadController{
  
  constructor(
    private readonly filesUploadService:FilesUploadService
  ){}

  @Post('upload-single')
  @UseInterceptors(FileInterceptor("file", {storage: storageConfig}))
  async uploadSingle(@UploadedFile() file:MulterFile){
    const url = await this.filesUploadService.uploadSingleFile(file)
    return {url}
  }

  @Post('upload-multiple')
  @UseInterceptors(FilesInterceptor("files", 10, {storage: storageConfig}))
  async uploadMultiple(@UploadedFiles() files: MulterFile[]){
    const urls = await this.filesUploadService.uploadMultipleFiles(files);
    return {urls}
  }

  @Delete('delete')
  async deleteFile(@Body('url')url: string | string[]){
    await this.filesUploadService.deleteFileByUrl(url)
    return { message: "File(s) deleted successfully" };
  }
}