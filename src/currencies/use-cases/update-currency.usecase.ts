import { BadRequestException, Injectable } from "@nestjs/common";
import { CurrencyRepository } from "../repository/currency.repository";
import { UpdateCurrencyDto } from "../dtos/update-currency.dto";
import { plainToInstance } from "class-transformer";
import { CurrencyResponseDto } from "../dtos/currency-response.dto";

@Injectable()
export class UpdateCurrencyUsecase{
    
    constructor(
        private readonly currencyRepository: CurrencyRepository
    ) {}

    async execute(
        currencyId: string,
        body: UpdateCurrencyDto
    ): Promise<CurrencyResponseDto> {
        const currency = await this.currencyRepository.findOne({
            _id: currencyId,
            isDeleted: { $ne: true },
        });
        if (!currency){
            throw new BadRequestException('Currency not found');
        } 
        if(body?.name){
            const existingCurrency = await this.currencyRepository.findOne({
                name: body.name,
                isDeleted: {$ne: true},
                _id: {$ne: currencyId}
            })
            if(existingCurrency){
                throw new BadRequestException('Currency name already exists');
            }
        }

        const updatedCurrency = await this.currencyRepository.findByIdAndUpdate(
            currencyId,
            body,
            {returnDocument: 'after'}
        )
        if (!updatedCurrency) {
            throw new BadRequestException('Currency not found');
        }
        return plainToInstance(CurrencyResponseDto, updatedCurrency.toObject())
    }
} 