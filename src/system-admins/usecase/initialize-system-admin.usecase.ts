import { Injectable, Logger } from "@nestjs/common";
import { SystemAdminRepository } from "../repository/system-admin.repository";
import { ConfigService } from "@nestjs/config";
import { EnvironmentInterface, ISystemAdmin } from "src/common/configuration/enviroment.interface";
import * as bycrpt from 'bcrypt'


@Injectable()
export class InitializeSystemAdminUsecase {

    private logger = new Logger(InitializeSystemAdminUsecase.name)

    constructor(
        private readonly systemAdminRepository: SystemAdminRepository,
        private readonly configService: ConfigService<EnvironmentInterface>
    ){}

    async execute():Promise<void>{
        const {name, email, password} =
            this.configService.getOrThrow<ISystemAdmin>('systemAdmin')

        const systemAdmin = await this.systemAdminRepository.findOne({email})
        if(systemAdmin){
            this.logger.log('System admin already initialized');
            return;
        }            
        const salt = this.configService.getOrThrow<Number>('bcryptSaltRounds')
        const hashedPassword = await bycrpt.hash(password, salt)
        await this.systemAdminRepository.create({
            name,
            email,
            password: hashedPassword,
            isSuperAdmin: true
        })
        this.logger.log('System admin initialized')        
    }
}