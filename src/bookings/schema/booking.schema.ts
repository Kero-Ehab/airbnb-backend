import { Prop, Schema } from "@nestjs/mongoose";
import { ModelNames } from "src/common/data-access";
import { BookingStatus } from "../enums/booking-status.enum";
import { CancelBy } from "../enums/cancel-by.enum";


@Schema({timestamps: true})
export class Booking {

    @Prop({required: true, ref:ModelNames.UNITS})
    unit: string;

    @Prop({required: true, ref:ModelNames.USERS})
    guest: string

    @Prop({required: true, ref:ModelNames.USERS})
    host:string;
    
    @Prop({required: true, type: Date})
    checkIn: number| Date;

    @Prop({required:true, type: Date})
    checkOut: number| Date;

    @Prop({required:true})
    dayCount: number;

    @Prop({required: true})
    pricePerDay: number;

    @Prop({required: true})
    bookingAmount: number;

    @Prop({required: true, default: 0})
    vat: number

    @Prop({required: true, default: 0})
    vatAmount: number

    @Prop({required: true})
    totalAmount:number

    @Prop()
    adultsCount?:number;

    @Prop()
    kidsCount?: number;

    @Prop()
    notes?: string;

    @Prop({type: String, enum:BookingStatus, default: BookingStatus.PENDING})
    status: BookingStatus;

    @Prop()
    cancellationReason?: string;

    @Prop()
    cancellationDate?: Date;

    @Prop({type: String, enum: CancelBy})
    cancelBy?: CancelBy;

    // @Prop()
    // guestReview?: GuestReview;
}