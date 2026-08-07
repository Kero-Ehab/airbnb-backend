import { Injectable } from "@nestjs/common";
import { uploadSingleFileUseCase } from "./use-cases/upload-single-file.usecase";
import { uploadMultipleFilesUseCase } from "./use-cases/upload-multiple-files.usecase";
import { DeleteFileByUrlUseCase } from "./use-cases/delete-file-by-url.usecase";
import { MulterFile } from "./types/multer-file.type";

@Injectable()
export class FilesUploadService {
  constructor(
    private readonly uploadSingleFileUseCase: uploadSingleFileUseCase,
    private readonly uploadMultipleFilesUseCase: uploadMultipleFilesUseCase,
    private readonly deleteFileByUrlUseCase: DeleteFileByUrlUseCase,
  ) {}

  async uploadSingleFile(file: MulterFile): Promise<string> {
    return this.uploadSingleFileUseCase.execute(file);
  }

  async uploadMultipleFiles(files: MulterFile[]): Promise<string[]> {
    return this.uploadMultipleFilesUseCase.execute(files);
  }

  async deleteFileByUrl(url: string | string[]): Promise<void> {
    return this.deleteFileByUrlUseCase.execute(url);
  }
}