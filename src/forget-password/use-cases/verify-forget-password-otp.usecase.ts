import { BadRequestException, Injectable } from "@nestjs/common";
import { ForgetPasswordRepository } from "../repository/forget-password.repository";
import { VerifyForgetPasswordOtpDto } from "../dtos/verify-forget-password-otp.dto";

@Injectable()
export class VerifyForgetPasswordOtpUseCase{

    constructor(
        private readonly forgetPasswordRepository: ForgetPasswordRepository
    ){}


    async execute(body: VerifyForgetPasswordOtpDto):Promise<void>{
        
        const user = await this.forgetPasswordRepository.findOne({email : body.email})
        if(!user){
            throw new BadRequestException('Invalid email');
        }

        if(user.code !== body.code){
            throw new BadRequestException('Invalid code');
        }
        
        if(new Date() > new Date(user.expiresAt)){
            throw new BadRequestException('Code expired');
        }

        if(user.isVerified){
            throw new BadRequestException('Code already used');
        }
        await this.forgetPasswordRepository.findOneAndUpdate(
            {
                email: body.email,
            },
            { 
                isVerified: true 
            },
        );
    }
}