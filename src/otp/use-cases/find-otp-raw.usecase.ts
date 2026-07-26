import { Injectable } from "@nestjs/common";
import { OtpRepository } from "../respository/otp.respository";
import { Otp } from "../schemas/otp.schema";
import { QueryFilter } from "mongoose";
import { OtpRawResponseDto } from "../dtos/otp-raw-response.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class FindOtpRawUsecase{
    
    constructor(
        private readonly otpRepository:OtpRepository
    ){}

    async execute(query: QueryFilter<Otp>): Promise<OtpRawResponseDto> {
        const otp = this.otpRepository.findOne({query})
        return plainToInstance(OtpRawResponseDto, otp)
    }
}