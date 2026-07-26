import { Injectable } from "@nestjs/common";
import { FindOtpRawUsecase } from "./use-cases/find-otp-raw.usecase";
import { SendOtpUseCase } from "./use-cases/send-otp.usecase";
import { VerifyOtpUseCase } from "./use-cases/verify-otp.usecase";
import { VerifyOtpDto } from "./dtos/verify-otp.dto";
import { QueryFilter } from "mongoose";
import { Otp } from "./schemas/otp.schema";
import { OtpRawResponseDto } from "./dtos/otp-raw-response.dto";





@Injectable()
export class OtpService{

   constructor(
    private readonly findOtpRawUsecase:FindOtpRawUsecase,
    private readonly sendOtpUseCase:SendOtpUseCase,
    private readonly verifyOtpUseCase:VerifyOtpUseCase,    
   ){}
   
   async sendOtp(email:string):Promise<void>{
        await this.sendOtpUseCase.execute(email)
   }
   async verifyOtp(body: VerifyOtpDto):Promise<void>{
        await this.verifyOtpUseCase.execute(body)
   }
   async findOtpRaw(query:QueryFilter<Otp>):Promise<OtpRawResponseDto>{
        return this.findOtpRawUsecase.execute(query)
   }

}