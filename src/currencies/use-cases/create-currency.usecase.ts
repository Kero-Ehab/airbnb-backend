import { Injectable } from "@nestjs/common";
import { CurrencyRepository } from "../repository/currency.repository";
import { CreateCurrencyDto } from "../dtos/create-currency.dto";
import { BadRequestExeption } from "src/common/errors-handling/custom-exceptions/bad-request.exception";
import { plainToInstance } from "class-transformer";
import { CurrencyResponseDto } from "../dtos/currency-response.dto";

@Injectable()
export class CreateCurrencyUsecase{

    constructor(
        private readonly currencyRepository: CurrencyRepository,
    ){}

    async execute(body: CreateCurrencyDto): Promise<CurrencyResponseDto>{
        const existingCurrency = await this.currencyRepository.findOne({
            name: body.name,
            isDeleted: {$ne: false}
        })
        if(existingCurrency){
            throw new BadRequestExeption('Currency name already exist')
        }
        const createdCurrency = await this.currencyRepository.create(body);
        return plainToInstance(CurrencyResponseDto, createdCurrency.toObject());
    }
}