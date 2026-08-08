import { Module } from "@nestjs/common";
import { FilesUploadController } from "./files-upload.controller";
import { FilesUploadService } from "./files-upload.service";
import { uploadMultipleFilesUseCase } from "./use-cases/upload-multiple-files.usecase";
import { uploadSingleFileUseCase } from "./use-cases/upload-single-file.usecase";
import { DeleteFileByUrlUseCase } from "./use-cases/delete-file-by-url.usecase";

@Module({
  controllers:[FilesUploadController],
  providers:[
    FilesUploadService,
    uploadMultipleFilesUseCase,
    uploadSingleFileUseCase,
    DeleteFileByUrlUseCase
  ],
  exports:[FilesUploadService]
})
export class FilesUploadModule{}