import { Injectable } from "@nestjs/common";
import { SystemAdminRepository } from "../repository/system-admin.repository";
import { SystemAdmin } from "../schema/system-admin.schema";
import { QueryFilter } from "mongoose";
import { plainToInstance } from "class-transformer";
import { SystemAdminResponseDto } from "../dto/system-admin-response.dto";

@Injectable()
export class FindOneSystemAdminUsecase{
    constructor(private readonly systemAdminRepository: SystemAdminRepository){}
    
    async execute(
        query: QueryFilter<SystemAdmin>
    ): Promise<SystemAdminResponseDto>{
        const systemAdmin = await this.systemAdminRepository.findOne(query)
        return plainToInstance(SystemAdminResponseDto, systemAdmin)
    }
}