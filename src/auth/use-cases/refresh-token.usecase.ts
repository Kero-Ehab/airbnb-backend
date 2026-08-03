import { JwtService } from "@nestjs/jwt";
import { RefreshTokenDto } from "../dto/refresh-token.dto";
import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { RefreshTokenRepository } from "../repository/refresh-token.repository";
import * as bcrypt from 'bcrypt'
import { GenerateTokensUsecase } from "./generate-token.usecase";
import { Roles } from "src/common/constants/roles.constants";
import { AuthResponseDto } from "../dto/auth-response.dto";
import { plainToInstance } from "class-transformer";
import { ConfigService } from "@nestjs/config";
import { EnvironmentInterface } from "src/common/configuration/enviroment.interface";

@Injectable()
export class RefreshTokenUsecase{

    constructor(
        private readonly jwtService: JwtService,
        private readonly refreshTokenRepository: RefreshTokenRepository,
        private readonly generateTokenUsecase: GenerateTokensUsecase,
        private readonly configService: ConfigService<EnvironmentInterface>
    ){}

    async execute (body: RefreshTokenDto): Promise<AuthResponseDto>{

        type RefreshTokenPayload ={
            payload:{id:string, role:string},
            type: string
        }

        let decodedToken: RefreshTokenPayload

        try {
            decodedToken = await this.jwtService.verifyAsync<RefreshTokenPayload>(body.refreshToken)
        } catch (error) {
            throw new ForbiddenException('Invalid refresh token');
        }

        if(decodedToken.type !== 'refresh'){
            throw new BadRequestException('Invalid refresh token');
        }

        const refreshTokenDoc = await this.refreshTokenRepository.findOne({
            userId: decodedToken.payload.id,
        })
        
        if(!refreshTokenDoc){
            throw new ForbiddenException('Invalid refresh token')
        }

        const isRefreshTokenMatched = await bcrypt.compare(
            body.refreshToken,
            refreshTokenDoc.refreshToken
        ) 

        if(!isRefreshTokenMatched){
            throw new ForbiddenException('Invalid refresh token');
        }

        const {accessToken , refreshToken} = 
            await this.generateTokenUsecase.execute({
                id: refreshTokenDoc.userId,
                role: decodedToken.payload.role as Roles
            })

        return plainToInstance(AuthResponseDto , {accessToken, refreshToken})
    }
}