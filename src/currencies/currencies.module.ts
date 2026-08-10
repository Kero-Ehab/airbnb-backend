import { Module } from "@nestjs/common";
import { ModelNames } from "src/common/data-access";
import { CurrencySchema } from "./schema/currency.schema";
import { MongooseModule } from "@nestjs/mongoose";



@Module({
    imports:[
        MongooseModule.forFeature([
            {name: ModelNames.CURRENCIES, schema: CurrencySchema }
        ])
    ]
})
export class CurrenciesModule {}