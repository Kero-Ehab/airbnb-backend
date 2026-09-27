import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingRepository } from '../repositories/booking.repository';
import { BookingResponseDto } from '../dtos/booking-response.dto';
import { QueryFilter } from 'mongoose';
import { Booking } from '../schema/booking.schema';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FindOneUseCase {
  constructor(private readonly bookingRepository: BookingRepository) {}

  async execute(query: QueryFilter<Booking>): Promise<BookingResponseDto> {
    const booking = await this.bookingRepository.findOne(query);
    if (!booking) throw new NotFoundException('Booking not found');
    return plainToInstance(BookingResponseDto, booking);
  }
}