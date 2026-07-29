import { Module } from '@nestjs/common';
import { GenerateTokensUsecase } from './use-cases/generate-token.usecase';
import { RegisterUseCase } from './use-cases/register.usecase';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelNames } from 'src/common/data-access';
import { RefreshTokenSchema } from './schemas/refresh-token.schema';
import { UserModule } from 'src/users/users.module';
import { OtpModule } from 'src/otp/otp.module';
import { RefreshTokenRepository } from './repository/refresh-token.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EnvironmentInterface } from 'src/common/configuration/enviroment.interface';
import { LoginAsUserUsecase } from './use-cases/login-as-user.usecase';
import { LoginAsAdminUsecase } from './use-cases/login-as-system-admin..usecase';

@Module({
    imports:[
        MongooseModule.forFeature([
            {name:ModelNames.REFRESH_TOKENS, schema: RefreshTokenSchema}
        ]),
        UserModule,
        OtpModule,
        JwtModule.registerAsync({
            useFactory:(configService:ConfigService<EnvironmentInterface>) =>({
                secret: configService.getOrThrow('jwtSecret'),
                signOptions:{
                    expiresIn: configService.getOrThrow('accessTokenExpireIn')
                }
            }),
            inject:[ConfigService],
        }),
    ],
    providers:[
        AuthService,
        GenerateTokensUsecase,
        RegisterUseCase,
        LoginAsUserUsecase,
        LoginAsAdminUsecase,
        RefreshTokenRepository
    ],
    controllers:[AuthController],
    exports:[AuthService]
})
    
export class AuthModule {}
