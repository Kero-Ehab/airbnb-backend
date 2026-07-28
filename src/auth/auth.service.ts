import { Injectable } from "@nestjs/common";
import { RegisterUseCase } from "./use-cases/register.usecase";
import { RegisterDto } from "./dto/register.dto";
import { AuthResponseDto } from "./dto/auth-response.dto";




@Injectable()
export class AuthService{
    constructor(
        private readonly registerUsecase:RegisterUseCase
    ){}

    async register(body: RegisterDto):Promise<AuthResponseDto>{
        return this.registerUsecase.execute(body)
    } 
}