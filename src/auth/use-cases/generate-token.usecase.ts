import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RefreshTokenRepository } from "../repository/refresh-token.repository";



@Injectable()
export class GenerateTokensUsecase {

    constructor(
        private readonly jwtService:JwtService,
        private readonly refreshTokenRepository: RefreshTokenRepository,
    ){}

    async execute (){
        
    }
}