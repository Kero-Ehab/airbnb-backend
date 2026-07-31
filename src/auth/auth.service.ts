import { Injectable } from "@nestjs/common";
import { RegisterUseCase } from "./use-cases/register.usecase";
import { RegisterDto } from "./dto/register.dto";
import { AuthResponseDto } from "./dto/auth-response.dto";
import { LoginDto } from "./dto/login.dto";
import { LoginUsecase } from "./use-cases/login.usecase";




@Injectable()
export class AuthService{
    constructor(
        private readonly registerUsecase:RegisterUseCase,
        private readonly loginUsecase: LoginUsecase
    ){}

    async register(body: RegisterDto):Promise<AuthResponseDto>{
        return this.registerUsecase.execute(body)
    }
    
    async login(body: LoginDto):Promise<AuthResponseDto>{
        return this.loginUsecase.execute(body)
    }
}