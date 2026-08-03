import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "../decorators/public.decorators";
import { IPrincipal } from "../interfaces/principal.interface";
import { Request } from "express";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { UserResponseDto } from "src/users/dto/user-response.dto";
import { SystemAdminResponseDto } from "src/system-admins/dto/system-admin-response.dto";
import { Roles } from "src/common/constants/roles.constants";
import { UserService } from "src/users/users.service";
import { systemAdminService } from "src/system-admins/system-admins.service";
import { JwtService } from "@nestjs/jwt";
import { UnAuthorizedException } from "src/common/errors-handling/custom-exceptions/un-authorized.exception";


export type RequestWithUser = Request & {
    principal: IPrincipal
}


@Injectable()
export class JwtAuthGuard implements CanActivate {
    private logger = new Logger(JwtAuthGuard.name)

    constructor(
        private readonly reflector: Reflector,
        private readonly userService: UserService,
        private readonly systemAdminService: systemAdminService,
        private readonly jwtService: JwtService
    ){}

    async canActivate(context: ExecutionContext) : Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY,[
            context.getHandler(),
            context.getClass()
        ])
        if(isPublic)return true;

        const request = context.switchToHttp().getRequest<RequestWithUser>();
        const token = request.headers.authorization?.split(' ')[1] 

        if(!token){
            throw new UnAuthorizedException('No Token Provider')
        }

        try {
            const payload: JwtPayload = await this.jwtService.verify(token)
            const currentAccount: IPrincipal = await this.buildCurrentUser(payload)

            request.principal = currentAccount
        } catch (e) {
            this.logger.error(e)
            throw new UnAuthorizedException('Invalid token');
        }

        return true
    }

    private async buildCurrentUser(payload: JwtPayload):Promise<IPrincipal>{
        let currentAccount: UserResponseDto | SystemAdminResponseDto;

        if(payload.role === Roles.USER){
            currentAccount = await this.userService.findOne({_id: payload.id}) 
        }else{
            currentAccount = await this.systemAdminService.findOne({_id: payload.id})
        }

        return {
            user: {
                _id: currentAccount._id,
                name: currentAccount.name,
                email: currentAccount.email
            },
            role: payload.role
        }
    }
}