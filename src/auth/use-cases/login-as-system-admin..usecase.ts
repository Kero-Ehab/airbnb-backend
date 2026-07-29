import { Injectable } from "@nestjs/common";
import { OtpService } from "src/otp/otp.service";
import { UserService } from "src/users/users.service";
import { GenerateTokensUsecase } from "./generate-token.usecase";







@Injectable()
export class LoginAsAdminUsecase{

    constructor(
        private readonly userService: UserService,
        private readonly generateTokensUsecase: GenerateTokensUsecase,
    ){}

}