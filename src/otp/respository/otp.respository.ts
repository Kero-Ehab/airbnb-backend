import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository, ModelNames } from "src/common/data-access";
import { Otp } from "../schemas/otp.schema";
import { HydratedDocument, Model } from "mongoose";


export class OtpRepository extends BaseRepository<Otp>{
    constructor(
        @InjectModel(ModelNames.OTP)
        private readonly otpModel:Model<HydratedDocument<Otp>>
    ){
        super(otpModel);
    }
}