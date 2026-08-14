import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ModelNames } from "src/common/data-access";

@Schema({timestamps:true})
export class City{
    @Prop({required: true})
    name: string

    @Prop({required: true, ref:ModelNames.COUNTRIES})
    countryId:string

    @Prop({default: false})
    isDeleted:boolean;

    @Prop()
    deletedAt: Date;
}

export const CitySchema = SchemaFactory.createForClass(City)
