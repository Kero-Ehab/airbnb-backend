import { Injectable } from "@nestjs/common";
import { ForgetPasswordRepository } from "../repository/forget-password.repository";
import { UserService } from "src/users/users.service";
import { BadRequestExeption } from "src/common/errors-handling/custom-exceptions/bad-request.exception";
import { MailService } from "src/mail/mail.service";

@Injectable()
export class SendForgetPasswordOtpUseCase{
    constructor(
        private readonly forgetPasswordRepository: ForgetPasswordRepository,
        private readonly userService: UserService,
        private readonly mailService: MailService
    ){}

    async execute(email: string):Promise<void>{
        const user = await this.userService.findOne({email})
        if(!user){
            throw new BadRequestExeption('User Not Found')
        }
        const code = this.generateOtp()
        const expiresAt = new Date()
        expiresAt.setMinutes(expiresAt.getMinutes() + 10)

        await this.forgetPasswordRepository.findOneAndUpdate(
            {email},
            {expiresAt, code, isVerified: false},
            {upsert: true}
        )

        await this.mailService.sendEmail({
            to: email,
            subject: 'Forget Password OTP',
            text:`Your OTP is ${code}`
        })  
    }

    private generateOtp():number{
        return Math.floor(100000 + Math.random() * 900000);
    }
} 