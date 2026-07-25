import { Body, Controller, Post } from "@nestjs/common";
import { SendEmailDto } from "./dtos/send-email.dto";
import { MailService } from "./mail.service";



@Controller('mail')
export class MailController{
    constructor(
        private readonly mailService: MailService
    ){}

    //@Public()
    @Post('/send')
    async sendMail(@Body() dto:SendEmailDto):Promise<void>{
        await this.mailService.sendEmail(dto)
    }
}