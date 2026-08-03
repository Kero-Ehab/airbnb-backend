import { BadRequestException, Injectable } from "@nestjs/common";
import { OtpService } from "src/otp/otp.service";
import { UserService } from "src/users/users.service";
import { GenerateTokensUsecase } from "./generate-token.usecase";
import { RegisterDto } from "../dto/register.dto";
import { AuthResponseDto } from "../dto/auth-response.dto";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { Roles } from "src/common/constants/roles.constants";


@Injectable()
export class RegisterUseCase{

    constructor(
        private readonly usersService: UserService,
        private readonly generateTokensUsecase: GenerateTokensUsecase,
        private readonly otpService: OtpService,  
    ){}

    async execute(body: RegisterDto):Promise<AuthResponseDto>{
        const createUserDto: CreateUserDto = {
            ...body,
            isVerified: true
        } 
        
        await this.validateEmailVerification(body.email)
        await this.validateUserNotExists(body.email)

        const createdUser = await this.usersService.create(createUserDto);

        const {accessToken, refreshToken}= await this.generateTokensUsecase.execute({
            id: createdUser._id,
            role: Roles.USER
        })

        return {accessToken, refreshToken}
    }
    private async validateUserNotExists(email:string){
        const user = await this.usersService.findOne({email})
        if(user){
            throw new BadRequestException('Email already exists');
        }
    }
    private async validateEmailVerification(email:string){
        const otp = await this.otpService.findOtpRaw({email})
        if(!otp || !otp.isVerified){
            throw new BadRequestException('Email not verified, please verify your email first')
        }
    }
} 