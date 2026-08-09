import { Body, Controller, Post } from "@nestjs/common";
import { ForgetPasswordService } from "./forget-password.service";
import { SendForgetPasswordOtpDto } from "./dtos/send-forget-password-otp.dto";
import { VerifyForgetPasswordOtpDto } from "./dtos/verify-forget-password-otp.dto";
import { ResetPasswordDto } from "./dtos/reset-password.dto";
import { Public } from "src/auth/decorators/public.decorators";

@Public()
@Controller('forget-password')
export class ForgetPasswordController{
    constructor(
        private readonly forgetPasswordService: ForgetPasswordService
    ) {}

    @Post('/send')
    async sendForgetPasswordOtp(@Body() body: SendForgetPasswordOtpDto): Promise<void> {
        await this.forgetPasswordService.sendForgetPasswordOtp(body.email);
    }
    @Post('/verify')
    async verifyForgetPasswordOtp(@Body() dto: VerifyForgetPasswordOtpDto): Promise<void> {
        await this.forgetPasswordService.verifyForgetPasswordOtp(dto);
    }
    @Post('/reset')
    async resetPassword(@Body() dto: ResetPasswordDto): Promise<void> {
        await this.forgetPasswordService.resetPassword(dto);
    }
}