import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { AuthResponseDto } from "./dto/auth-response.dto";
import { LoginDto } from "./dto/login.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";
import { CurrentAccount, Principal } from "./decorators/current-account.decorator";


@Controller('auth')
export class AuthController{

    constructor(private readonly authService:AuthService){}

    @Post('register')
    register(@Body() body: RegisterDto): Promise<AuthResponseDto>{
        return this.authService.register(body)
    }

    @Post('login')
    login(@Body() body: LoginDto):Promise<AuthResponseDto>{
        return this.authService.login(body)
    }

    @Post('refresh-token')
    refreshToken(@Body() body: RefreshTokenDto):Promise<AuthResponseDto>{
        return this.authService.refreshToken(body)
    }

    @Get('me')
    getMe(@CurrentAccount()  principal:Principal){
        return principal;
    }

}