import { BadRequestException, Injectable } from "@nestjs/common";
import { GenerateTokensUsecase } from "./generate-token.usecase";
import { systemAdminService } from "src/system-admins/system-admins.service";
import { LoginDto } from "../dto/login.dto";
import * as bycrpt from 'bcrypt'
import { Roles } from "src/common/constants/roles.constants";
import { plainToInstance } from "class-transformer";
import { AuthResponseDto } from "../dto/auth-response.dto";

@Injectable()
export class LoginAsAdminUsecase{

    constructor(
        private readonly systemAdminService: systemAdminService,
        private readonly generateTokensUsecase: GenerateTokensUsecase,
    ){}

    async execute(loginDto: LoginDto): Promise<AuthResponseDto> {
        const systemAdmin = await this.systemAdminService.findOne({
            email: loginDto.email
        })

        if(!systemAdmin){
            throw new BadRequestException('Invalid credentials 2')
        }

        const isPasswordMatched = await bycrpt.compare(
            loginDto.password,
            systemAdmin.password
        ) 
        if (!isPasswordMatched){
            throw new BadRequestException('Invalid credentials 3');
        }    

        const {accessToken, refreshToken} = 
           await this.generateTokensUsecase.execute({
            id: systemAdmin._id.toString(),
            roles: Roles.SYSTEM_ADMIN
           })
           
        return plainToInstance(AuthResponseDto, {accessToken, refreshToken})   
    }

}

