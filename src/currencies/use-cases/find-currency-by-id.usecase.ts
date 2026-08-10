import { Injectable, NotFoundException } from "@nestjs/common";
import { CurrencyRepository } from "../repository/currency.repository";
import { plainToInstance } from "class-transformer";
import { CurrencyResponseDto } from "../dtos/currency-response.dto";

@Injectable()
export class FindCurrencyByIdUsecase {
    constructor(
        private readonly currencyRepository: CurrencyRepository
    ){}

    async execute(id: string):Promise<CurrencyResponseDto>{
        const currency = await this.currencyRepository.findOne({
            _id: id,
            isDeleted: {$ne: true}
        })
        if (!currency) throw new NotFoundException('No currency found');

        return plainToInstance(CurrencyResponseDto, currency.toObject())
    }
}