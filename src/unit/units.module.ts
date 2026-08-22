import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ModelNames } from "src/common/data-access";
import { UnitSchema } from "./schemas/unit.schema";







@Module({
    imports:[
        MongooseModule.forFeature([
            {name:ModelNames.UNITS, schema:UnitSchema}
        ])
    ]
})
export class UnitModule {}