import { Injectable } from "@nestjs/common";
import { UserService } from "src/users/users.service";



@Injectable()
export class RegisterUseCase{

    constructor(
        private readonly userService: UserService,
        
    ){}
    
} 