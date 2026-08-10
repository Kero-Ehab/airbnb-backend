import { Module } from "@nestjs/common";
import { ModelNames } from "src/common/data-access";
import { CurrencySchema } from "./schema/currency.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { CurrencyRepository } from "./repository/currency.repository";
import { CreateCurrencyUsecase } from "./use-cases/create-currency.usecase";
import { FindAllCurrenciesUsecase } from "./use-cases/find-all-currencies.usecase";



@Module({
    imports:[
        MongooseModule.forFeature([
            {name: ModelNames.CURRENCIES, schema: CurrencySchema }
        ])
    ],
    providers:[
        CurrencyRepository,
        CreateCurrencyUsecase,
        FindAllCurrenciesUsecase,
    ]
})
export class CurrenciesModule {}