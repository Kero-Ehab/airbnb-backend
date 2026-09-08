import { FileValidator } from "@nestjs/common";
import { MulterFile } from "src/files-upload/types/multer-file.type";
import magicBytes from 'magic-bytes.js'

export class FileSignatureValidator extends FileValidator{
    constructor(){
        super({})
    }
    buildErrorMessage(): string {
        return 'validation failed (file type does not match file signature)';
    }

    isValid(file: MulterFile): boolean {
        const filesSignatures  = magicBytes(file.buffer).map((file) => file.mime)
        if(!filesSignatures.length) return false;

        const isMatch = filesSignatures.includes(file.mimetype)
        if(!isMatch) return false
        return true
    }
}