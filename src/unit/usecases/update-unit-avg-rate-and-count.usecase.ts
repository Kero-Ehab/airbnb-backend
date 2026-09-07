import { BadRequestException, Injectable } from "@nestjs/common";
import { UnitRepository } from "../repositories/unit.repository";
import { UpdateUnitAvgRateAndCountDto } from "../dtos/update-unit-avg-rate-and-count.dto";
import { ClientSession } from "mongoose";

@Injectable()
export class UpdateUnitAvgRateAndCountUsecase{
    constructor(
        private readonly unitRepository: UnitRepository
    ){}

    async execute(
        body:UpdateUnitAvgRateAndCountDto,
        session?: ClientSession
    ):Promise<void>{
        const unit = await this.unitRepository.findById(body.unitId, {session})
        if(!unit) throw new BadRequestException('Unit not found');

        await this.unitRepository.findByIdAndUpdate(
            body.unitId,
            {
                ratingAvg: body.ratingAvg,
                ratingCount: body.ratingCount
            },{
                session
            }
        )
    }
}