import { BadRequestException, Injectable } from "@nestjs/common";
import { OtpRepository } from "../respository/otp.respository";
import { MailService } from "src/mail/mail.service";
import { UserService } from "src/users/users.service";

@Injectable()
export class SendOtpUseCase{

    constructor(
        private readonly otpRepository: OtpRepository,
        private readonly mailService:MailService,
        private readonly userService:UserService
    ){}

    async execute (email:string):Promise<void>{
        await this.validateBeforeSendOtp(email);
        const code = await this.generateOtp() 
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 10);

        await this.otpRepository.findOneAndUpdate(
            {email},
            {
                code,
                expiresAt,
                isVerified:false
            },
            {
                upsert:true
            }        
        )

        await this.mailService.sendEmail({
            to:email,
            subject:'OTP Verification',
            text:`Your OTP is ${code}`
        })
        


    }

    private async validateBeforeSendOtp(email: string): Promise<void> {
        const user = await this.userService.findOne({
            email,
        });

        if (user?.isVerified) {
            throw new BadRequestException(
                'Email already verified',
            );
        }
  }

    private async generateOtp():Promise<number>{
        return Math.floor(100000 + Math.random() * 900000)
    }

}