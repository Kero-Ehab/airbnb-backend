import { Injectable, NotFoundException } from "@nestjs/common";
import { CurrencyRepository } from "../repository/currency.repository";
import { CurrencyIdDto } from "../dtos/currency-id.dto";

@Injectable()
export class SoftDeleteCurrencyUsecase{

    constructor(
        private readonly currencyRepository: CurrencyRepository
    ){}

    async execute(id: string):Promise<void>{
        const existingCurrency = await this.currencyRepository.findOne({
            _id: id,
            isDeleted: {$ne: true}
        })
        if (!existingCurrency){
            throw new NotFoundException('No currency found for this id');
        }
        await this.currencyRepository.findByIdAndUpdate(id,{
            isDeleted:true,
            deletedAt: new Date()
        })
    }
}