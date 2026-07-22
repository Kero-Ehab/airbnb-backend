import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository, ModelNames } from "src/common/data-access";
import { User } from "../schemas/user.schema";
import { HydratedDocument, Model } from "mongoose";


@Injectable()
export class UserRepository extends BaseRepository<User>{
    constructor(
        // Model provider registered by MongooseModule.forFeature() in UsersModule
        @InjectModel(ModelNames.USERS)
        private readonly userModel:Model<HydratedDocument<User>>
    ){
        super(userModel);
    }
}