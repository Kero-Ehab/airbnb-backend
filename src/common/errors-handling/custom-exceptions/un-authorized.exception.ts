import { HttpStatus } from "@nestjs/common";
import { BaseCustomException } from "./base-custom.exception";

export class UnAuthorizedException extends BaseCustomException{
    status = HttpStatus.UNAUTHORIZED;

    constructor(message: string){
        super(message)
    }
}