import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ModelNames } from "src/common/data-access";

@Schema({timestamps: true})
export class UnitReviews{
    @Prop({required: true, ref:ModelNames.BOOKINGS})
    booking:string;

    @Prop({required: true, ref:ModelNames.UNITS})
    unit:string

    @Prop({required:true, ref:ModelNames.USERS})
    guest: string

    @Prop({required: true})
    rating: number;

    @Prop()
    comment?:string
}

export const UnitReviewsSchema = SchemaFactory.createForClass(UnitReviews)