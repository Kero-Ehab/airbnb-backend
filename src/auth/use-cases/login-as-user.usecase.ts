import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { UserService } from "src/users/users.service";
import { GenerateTokensUsecase } from "./generate-token.usecase";
import { LoginDto } from "../dto/login.dto";
import { AuthResponseDto } from "../dto/auth-response.dto";
import * as bcrypt from 'bcrypt'
import { Roles } from "src/common/constants/roles.constants";
import { plainToInstance } from "class-transformer";


@Injectable()
export class LoginAsUserUsecase{
    private readonly logger = new Logger(LoginAsUserUsecase.name)

    constructor(
        private readonly userService: UserService,
        private readonly generateTokensUsecase:GenerateTokensUsecase
    ){}

    async execute(body: LoginDto){
        
        const user = await this.userService.findOne({ email: body.email });
        if(!user){
            throw new BadRequestException('User is not Exist')
        }
        const isPasswordMatched = await bcrypt.compare(
            body.password,
            user.password
        )
        
        if(!isPasswordMatched){
            throw new BadRequestException('invalid email or password')
        }

        const {refreshToken, accessToken} = 
        await this.generateTokensUsecase.execute({
            id:user._id.toString(),
            roles: Roles.USER
        }) 

        return plainToInstance(AuthResponseDto, {accessToken, refreshToken})
    }
}