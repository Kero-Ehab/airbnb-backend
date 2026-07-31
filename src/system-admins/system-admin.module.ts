import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ModelNames } from "src/common/data-access";
import { SystemAdminRepository } from "./repository/system-admin.repository";
import { systemAdminService } from "./system-admins.service";
import { FindOneSystemAdminUsecase } from "./usecase/find-one.usecase";
import { InitializeSystemAdminUsecase } from "./usecase/initialize-system-admin.usecase";

@Module({
    imports:[
        MongooseModule.forFeature([{
            schema: SystemAdminModule,
            name: ModelNames.SYSTEM_ADMINS
        }])
    ],
    providers:[
        SystemAdminRepository,
        systemAdminService,
        FindOneSystemAdminUsecase,
        InitializeSystemAdminUsecase
    ],
    exports:[systemAdminService]
})
export class SystemAdminModule {}