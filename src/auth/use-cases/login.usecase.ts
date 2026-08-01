import { Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginAsUserUsecase } from "./login-as-user.usecase";
import { LoginAsAdminUsecase } from "./login-as-system-admin..usecase";
import { LoginDto } from "../dto/login.dto";
import { SystemAdminRepository } from "src/system-admins/repository/system-admin.repository";
import { UserRepository } from "src/users/repository/user.repository";

@Injectable()
export class LoginUsecase{

    constructor(
        private readonly loginAsUserUsecase: LoginAsUserUsecase,
        private readonly loginAsAdminUsecase: LoginAsAdminUsecase,
        private readonly systemAdminRepository:SystemAdminRepository,
        private readonly userReository: UserRepository

    ){}

    async execute(body: LoginDto){

        const admin = await this.systemAdminRepository.findOne({
            email:body.email    
        })
        
        if(admin){
            return this.loginAsAdminUsecase.execute(
                body,
            )
        }

        const user = await this.userReository.findOne({
            email: body.email
        })

        console.log('USER:', user);
        
        if(user){
            return this.loginAsUserUsecase.execute(body)
        }

        throw new UnauthorizedException('Invalid credentials 1')
    }
}