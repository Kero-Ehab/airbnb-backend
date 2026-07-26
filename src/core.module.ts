import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configMapping from './common/configuration/config-mapping';


@Module({
    imports:[
        ConfigModule.forRoot({
            isGlobal:true,
            load:[configMapping]
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