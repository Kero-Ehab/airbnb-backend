import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
    imports:[
        ConfigModule.forRoot({
            isGlobal:true,
        }),
        MongooseModule.forRootAsync({
            inject:[ConfigService],
            useFactory:(configService:ConfigService)=> ({
                uri:configService.getOrThrow<string>('DATABASE_URI')
            }),
        })        
    ]
  
})
export class CoreModule{}