import { Injectable } from "@nestjs/common";
import { RegisterUseCase } from "./use-cases/register.usecase";
import { RegisterDto } from "./dto/register.dto";
import { AuthResponseDto } from "./dto/auth-response.dto";
import { LoginDto } from "./dto/login.dto";
import { LoginUsecase } from "./use-cases/login.usecase";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { RefreshTokenUsecase } from "./use-cases/refresh-token.usecase";


@Injectable()
export class AuthService{
    constructor(
        private readonly registerUsecase:RegisterUseCase,
        private readonly loginUsecase: LoginUsecase,
        private readonly refreshTokenUsecase: RefreshTokenUsecase
    ){}

    async register(body: RegisterDto):Promise<AuthResponseDto>{
        return this.registerUsecase.execute(body)
    }
    
    async login(body: LoginDto):Promise<AuthResponseDto>{
        return this.loginUsecase.execute(body)
    }

    async refreshToken(body: RefreshTokenDto):Promise<AuthResponseDto>{
        return this.refreshTokenUsecase.execute(body)
    }
}