import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { ForgetPasswordRepository } from "../repository/forget-password.repository";
import { ResetPasswordDto } from "../dtos/reset-password.dto";
import { BadRequestExeption } from "src/common/errors-handling/custom-exceptions/bad-request.exception";
import { Connection } from "mongoose";
import { UserService } from "src/users/users.service";
import * as bcrypt from 'bcrypt'
import { InjectConnection } from "@nestjs/mongoose";

@Injectable()
export class ResetPasswordUseCase {

    private logger  = new Logger(ResetPasswordUseCase.name)

    constructor(
        @InjectConnection()
        private readonly connection: Connection,
        private readonly forgetPasswordRepository:ForgetPasswordRepository,
        private readonly userService: UserService
    ){}


    async execute(body: ResetPasswordDto){
        const user = await this.forgetPasswordRepository.findOne({
            email: body.email
        })
        if(!user){
            throw new BadRequestExeption('Invalid email')
        }
        if(!user.isVerified){
            throw new BadRequestExeption('Code not verified')
        }
        const session = await this.connection.startSession();
        
        try {
            await session.withTransaction( async ()=>{
                const hashedPassword = await bcrypt.hash(body.newPassword, 10)
                await this.userService.updateUserRawSession(
                    {email: body.email},
                    {password: hashedPassword},
                    session
                )
                await this.forgetPasswordRepository.findOneAndDelete(
                    {email: body.email},
                    {session}
                )
            })
        } catch (e) {
            await session.abortTransaction()
            this.logger.error('Failed to reset password', e)
            throw new BadRequestException('Failed to reset password');
        }finally{
            await session.endSession();
        }
   }
}