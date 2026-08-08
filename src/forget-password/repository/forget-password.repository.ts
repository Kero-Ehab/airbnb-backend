import { Injectable } from "@nestjs/common";
import { BaseRepository, ModelNames } from "src/common/data-access";
import { ForgetPassword } from "../schemas/forget-password.schema";
import { InjectModel } from "@nestjs/mongoose";
import { HydratedDocument, Model } from "mongoose";

@Injectable()
export class ForgetPasswordRepository extends BaseRepository<ForgetPassword>{
    constructor(
        @InjectModel(ModelNames.FORGET_PASSWORD)
        private readonly forgetPasswordModel: Model<HydratedDocument<ForgetPassword>>
    ){
        super(forgetPasswordModel)
    }
}