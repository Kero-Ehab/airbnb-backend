import { ErrorResponse } from "../error-response.interface";

export abstract class BaseCustomException extends Error{
    abstract status: number;

    protected constructor(message: string){
        super(message);
    }
    formateError():ErrorResponse[]{
        return [{
            message:this.message
        }]
    }
}