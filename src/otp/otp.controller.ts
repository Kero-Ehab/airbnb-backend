import { Body, Controller, Post } from "@nestjs/common";
import { OtpService } from "./otp.service";
import { VerifyOtpDto } from "./dtos/verify-otp.dto";
import { SendOtpDto } from "./dtos/send-otp.dto";

//@Public()
@Controller('otp')
export class OtpController{

    constructor(
        private readonly otpService:OtpService,
    ){}

    @Post('/send')
    async sendOtp(@Body() body:SendOtpDto):Promise<void>{
        await this.otpService.sendOtp(body.email)
    }

    @Post('/verify')
    async verifyOtp(@Body() body: VerifyOtpDto):Promise<void>{
        await this.otpService.verifyOtp(body)
    }
} 