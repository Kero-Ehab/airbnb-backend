import { BaseRepository, ModelNames } from "src/common/data-access";
import { SystemAdmin } from "../schema/system-admin.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { HydratedDocument, Model } from "mongoose";

@Injectable()
export class SystemAdminRepository extends BaseRepository<SystemAdmin> { 
    constructor(
        @InjectModel(ModelNames.SYSTEM_ADMINS)
        private readonly systemAdminModel: Model<HydratedDocument<SystemAdmin>>
    ){
        super(systemAdminModel)
    }
}