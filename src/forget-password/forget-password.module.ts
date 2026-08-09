import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNames } from '../common/data-access';
import { ForgetPasswordSchema } from './schemas/forget-password.schema';
import { ForgetPasswordController } from './forget-password.controller';
import { ForgetPasswordService } from './forget-password.service';
import { MailModule } from '../mail/mail.module';
import { UserModule } from 'src/users/users.module';
import { ForgetPasswordRepository } from './repository/forget-password.repository';
import { ResetPasswordUseCase } from './use-cases/reset-password.usecase';
import { SendForgetPasswordOtpUseCase } from './use-cases/send-forget-password-otp.usecase';
import { VerifyForgetPasswordOtpUseCase } from './use-cases/verify-forget-password-otp.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelNames.FORGET_PASSWORD, schema: ForgetPasswordSchema },
    ]),
    UserModule,
    MailModule,
  ],
  providers: [
    ForgetPasswordRepository,
    ForgetPasswordService,
    ResetPasswordUseCase,
    SendForgetPasswordOtpUseCase,
    VerifyForgetPasswordOtpUseCase,
  ],
  controllers: [ForgetPasswordController],
})
export class ForgetPasswordModule {}