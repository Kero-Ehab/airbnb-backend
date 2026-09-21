import { Injectable } from "@nestjs/common";
import { BaseRepository, ModelNames } from "src/common/data-access";
import { Booking } from "../schema/booking.schema";
import { InjectModel } from "@nestjs/mongoose";
import { HydratedDocument, Model } from "mongoose";

@Injectable()
export class BookingRepository extends BaseRepository<Booking>{
    constructor(
        @InjectModel(ModelNames.BOOKINGS)
        private readonly bookModel: Model<HydratedDocument<Booking>>
    ){
        super(bookModel)
    }
}