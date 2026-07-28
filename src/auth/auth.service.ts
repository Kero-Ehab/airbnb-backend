import { Injectable } from "@nestjs/common";
import { RegisterUseCase } from "./use-cases/register.usecase";
import { RegisterDto } from "./dto/register.dto";
import { AuthResponseDto } from "./dto/auth-response.dto";
import { LoginDto } from "./dto/login.dto";




@Injectable()
export class AuthService{
    constructor(
        private readonly registerUsecase:RegisterUseCase,
        //private readonly loginUsecase:
    ){}

    async register(body: RegisterDto):Promise<AuthResponseDto>{
        return this.registerUsecase.execute(body)
    }
    
    // async login(body: LoginDto):Promise<AuthResponseDto>{
    //     return this.
    // }
}