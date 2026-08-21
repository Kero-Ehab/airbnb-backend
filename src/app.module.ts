import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core.module';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { OtpModule } from './otp/otp.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { RolesGuard } from './auth/guard/roles.guard';
import { FilesUploadModule } from './files-upload/files-upload.module';
import { ForgetPasswordModule } from './forget-password/forget-password.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { CountriesModule } from './countries/countries.module';
import { CitiesModule } from './cities/cities.module';
import { UnitCategoriesModule } from './unit-categories/unit-categories.module';


@Module({
  imports: [
    CoreModule,
    UserModule,
    AuthModule,
    OtpModule,
    FilesUploadModule,
    ForgetPasswordModule,
    CurrenciesModule,
    CountriesModule,
    CitiesModule,
    UnitCategoriesModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  
  ],
})
export class AppModule {}
