import { BaseCustomException } from "./base-custom.exception";



export class BadRequestExeption extends BaseCustomException{
    status = 400;
    constructor(message:string){
        super(message);
    }
}