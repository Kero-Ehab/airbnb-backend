import { Injectable, NotFoundException } from "@nestjs/common";
import { CurrencyRepository } from "../repository/currency.repository";
import { CurrencyIdDto } from "../dtos/currency-id.dto";

@Injectable()
export class SoftDeleteCurrencyUsecase{

    constructor(
        private readonly currencyRepository: CurrencyRepository
    ){}

    async execute(dto: CurrencyIdDto):Promise<void>{
        const existingCurrency = await this.currencyRepository.findOne({
            _id: dto.id,
            isDeleted: {$ne: true}
        })
        if (!existingCurrency){
            throw new NotFoundException('No currency found for this id');
        }
        await this.currencyRepository.findByIdAndUpdate(dto.id,{
            isDeleted:true,
            deletedAt: new Date()
        })
    }
}