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
        const otp = await this.findOtpRawUsecase.execute({email:body.email})
        this.validateOtpBeforeVerify(otp, body);

        await this.otpRepository.findOneAndUpdate(
            {
                email:body.email,
            },
            {
                isVerified:true
            }
        )
    }

    private validateOtpBeforeVerify(otp:OtpRawResponseDto, body:VerifyOtpDto){
        if(!otp)throw new BadRequestException('Invalid OTP');
        if(otp.code!== body.code)throw new BadRequestException('Invalid OTP');
        if(otp.isVerified)throw new BadRequestException('OTP already verified');
        if(new Date > otp.expiresAt)
            throw new BadRequestException('OTP expired');
    }
}