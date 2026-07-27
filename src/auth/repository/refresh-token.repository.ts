import { BaseRepository, ModelNames } from "src/common/data-access";
import { RefreshToken } from "../schemas/refresh-token.schema";
import { Injectable } from "@nestjs/common";
import { HydratedDocument, Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class RefreshTokenRepository extends BaseRepository<RefreshToken>{
    constructor(
        @InjectModel(ModelNames.REFRESH_TOKENS)
        private readonly refreshTokenModel: Model<HydratedDocument<RefreshToken>>
    ){
        super(refreshTokenModel)
    }
}