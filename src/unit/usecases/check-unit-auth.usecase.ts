import { ForbiddenException, Injectable } from "@nestjs/common";
import { CurrentUserData } from "src/auth/interfaces/principal.interface";

@Injectable()
export class CheckUnitAuthUseCase{
    execute(unitOwnerId: string, currentUser: CurrentUserData):void{
        if(currentUser._id.toString() !== unitOwnerId){
            throw new ForbiddenException(
                'You are not allowed. only unit owner can do that'
            )
        }
    }
}