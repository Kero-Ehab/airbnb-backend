import { BadRequestException, Injectable } from "@nestjs/common";
import { OtpRepository } from "../respository/otp.respository";
import { FindOtpRawUsecase } from "./find-otp-raw.usecase";
import { VerifyOtpDto } from "../dtos/verify-otp.dto";
import { OtpRawResponseDto } from "../dtos/otp-raw-response.dto";





@Injectable()
export class VerifyOtpUseCase{
    constructor(
        private readonly otpRepository:OtpRepository,
        private readonly findOtpRawUsecase: FindOtpRawUsecase
    ){}


    async execute (body: VerifyOtpDto):Promise<void>{
        const code = await this.findOtpRawUsecase.execute({email:body.email})
        console.log(code)
        this.validateOtpBeforeVerify(code, body);

        await this.otpRepository.findOneAndUpdate(
            {
                email:body.email,
            },
            {
                isVerified:true
            }
        )
    }

    private validateOtpBeforeVerify(code:OtpRawResponseDto, body:VerifyOtpDto){
        if(!code)throw new BadRequestException('Invalid OTP');
        if(code.code !== body.code)throw new BadRequestException('Invalid OTP');
        if(code.isVerified)throw new BadRequestException('OTP already verified');
        if(new Date() > code.expiresAt)
            throw new BadRequestException('OTP expired');
    }
}