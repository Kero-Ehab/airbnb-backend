import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RefreshTokenRepository } from "../repository/refresh-token.repository";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from 'bcrypt'


@Injectable()
export class GenerateTokensUsecase {

    constructor(
        private readonly jwtService:JwtService,
        private readonly refreshTokenRepository: RefreshTokenRepository,
        private readonly configService:ConfigService
    ){}
    async execute (payload: JwtPayload){
        const accessToken = await this.jwtService.signAsync(payload);
        const refreshToken = await this.jwtService.signAsync(
            {payload, type:'refresh'},
            {expiresIn: this.configService.getOrThrow('REFRESH_TOKEN_EXPIRES_IN')}
        )

        const hashRefreshToken = await bcrypt.hash(refreshToken, 10);

        await this.refreshTokenRepository.findOneAndUpdate(
            {userId: payload.id},
            {refreshToken: hashRefreshToken},
            {
                returnDocument: 'after',
                upsert: true 
            }
        )

        return {accessToken, refreshToken};
    }
}