import { ConfigService } from "@nestjs/config";
import { SendEmailDto } from "../dtos/send-email.dto";
import { EmailAdapterInterface } from "../interfaces/email-adapter.interface";
import * as nodemailer from 'nodemailer'
import { EnvironmentInterface, Ismtp } from "src/common/configuration/enviroment.interface";


export class NodemailerEmailAdapter implements EmailAdapterInterface{
    private readonly transporter:nodemailer.Transporter;
    
    constructor(
        private readonly configService:ConfigService<EnvironmentInterface>,
    ){
        const smtp = this.configService.getOrThrow<Ismtp>('smtp');
        this.transporter = nodemailer.createTransport(smtp);// this type is Transporter
    }


    async sendEmail(dto: SendEmailDto): Promise<void> {
        await this.transporter.sendMail({
            from:'support@airbnb.com',
            to:dto.to,
            subject:dto.subject,
            text:dto.text
        })
    }
}