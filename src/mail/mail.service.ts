import { Inject, Injectable, Logger } from "@nestjs/common";
import { EMAIL_ADAPTER } from "./constants/mail.constant";
import type { EmailAdapterInterface } from "./interfaces/email-adapter.interface";
import { SendEmailDto } from "./dtos/send-email.dto";
import { BadRequestExeption } from "src/common/errors-handling/custom-exceptions/bad-request.exception";




@Injectable()
 export class MailService{

    private logger = new Logger(MailService.name)

    constructor(
        @Inject(EMAIL_ADAPTER)
        private readonly eamilAdapter: EmailAdapterInterface
    ){}


    async sendEmail(dto:SendEmailDto): Promise<void>{
        try {
            await this.eamilAdapter.sendEmail(dto)
        } catch (e) {
            this.logger.error('Failed to send email', e)
            throw new BadRequestExeption('Failed to send email')
        }
    }
 }