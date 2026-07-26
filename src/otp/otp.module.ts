import { Module } from "@nestjs/common";
import { FindOtpRawUsecase } from "./use-cases/find-otp-raw.usecase";
import { SendOtpUseCase } from "./use-cases/send-otp.usecase";
import { VerifyOtpUseCase } from "./use-cases/verify-otp.usecase";
import { OtpService } from "./otp.service";
import { OtpController } from "./otp.controller";
import { OtpRepository } from "./respository/otp.respository";
import { MongooseModule } from "@nestjs/mongoose";
import { ModelNames } from "src/common/data-access";
import { OtpSchema } from "./schemas/otp.schema";
import { MailModule } from "src/mail/mail.module";
import { UsersModule } from "src/users/users.module";

@Module({
    imports:[
        MongooseModule.forFeature([{name: ModelNames.OTP, schema:OtpSchema}]),
        MailModule,
        UsersModule
    ],
    providers:[
        FindOtpRawUsecase,
        SendOtpUseCase,
        VerifyOtpUseCase,
        OtpService,
        OtpRepository
    ],
    controllers:[OtpController],
    exports:[OtpModule]
})
export class OtpModule{}