import { Injectable, OnModuleInit } from "@nestjs/common";
import { InitializeSystemAdminUsecase } from "./usecase/initialize-system-admin.usecase";
import { FindOneSystemAdminUsecase } from "./usecase/find-one.usecase";
import { SystemAdminResponseDto } from "./dto/system-admin-response.dto";
import { QueryFilter } from "mongoose";
import { SystemAdmin } from "./schema/system-admin.schema";

@Injectable()
export class systemAdminService implements OnModuleInit {

    constructor(
        private readonly initializeSystemAdminUsecase: InitializeSystemAdminUsecase,
        private readonly findOneSystemAdminUsecase: FindOneSystemAdminUsecase
    ){}

    async onModuleInit() {
        await this.initializeSystemAdminUsecase.execute();   
    }

    async findOne(
        query: QueryFilter<SystemAdmin>,
    ):Promise<SystemAdminResponseDto>{
        return await this.findOneSystemAdminUsecase.execute(query)
    }
}