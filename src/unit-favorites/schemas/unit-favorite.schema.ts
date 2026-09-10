import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ModelNames } from "src/common/data-access";

@Schema({timestamps: true})
export class UnitFavorit{
    @Prop({required: true, ref: ModelNames.UNITS})
    unit: string;

    @Prop({required: true, ref:ModelNames.USERS})
    user: string;
}

export const UnitFavoritSchema = SchemaFactory.createForClass(UnitFavorit)

UnitFavoritSchema.index({unit:1, user:1}, {unique: true});