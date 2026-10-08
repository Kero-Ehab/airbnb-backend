import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateBookingRequestDto } from '../dtos/update-booking-request.dto';
import { CurrentUserData } from '../../auth/interfaces/principal.interface';
import { BookingResponseDto } from '../dtos/booking-response.dto';
import { BookingRepository } from '../repositories/booking.repository';
import { BookingValidationUseCase } from './booking-validation.usecase';
import dayjs from 'dayjs';
import { plainToInstance } from 'class-transformer';
import { BookingParticipantAuthUsecase } from './booking-participant-auth.usecase';

@Injectable()
export class UpdateBookingByGuestUsecase {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly bookingValidationUseCase: BookingValidationUseCase,
    private readonly bookingParticipantAuthUsecase: BookingParticipantAuthUsecase,
  ) {}

  async execute(
    id: string,
    body: UpdateBookingRequestDto,
    user: CurrentUserData,
  ): Promise<BookingResponseDto> {
    // 1. find booking by id
    const booking = await this.bookingRepository.findById(id);
    if (!booking) throw new NotFoundException('Booking not found');

    // 2. validate if the user is the booking guest
    this.bookingParticipantAuthUsecase.checkGuestAuth(
      booking?.guest.toString(),
      user._id.toString(),
    );
    // 3. if the gust want to update check-in and check-out, check availability
    await this.validateDateRange(
      body,
      booking.unit.toString(),
      booking._id.toString(),
    );
    // 4. validate capacity
    await this.validateCapacity(
      body?.adultsCount,
      body?.kidsCount,
      booking.unit.toString(),
    );

    // update booking
    const updatedBooking = await this.bookingRepository.findByIdAndUpdate(
      id,
      {
        $set: body,
      },
      {
        returnDocument: 'after',
        lean: true,
      },
    );

    return plainToInstance(BookingResponseDto, updatedBooking);
  }

  private async validateDateRange(
    body: UpdateBookingRequestDto,
    unitId: string,
    bookingId: string,
  ) {
    if (body?.checkIn && !body?.checkOut)
      throw new BadRequestException('Check-out date is required');
    if (body?.checkOut && !body?.checkIn)
      throw new BadRequestException('Check-in date is required');

    if (body?.checkIn && body?.checkOut) {
      body.checkIn = dayjs(body.checkIn).toDate();
      body.checkOut = dayjs(body.checkOut).toDate();

      this.bookingValidationUseCase.validateDateRange(
        body.checkIn,
        body.checkOut,
      );

      await this.bookingValidationUseCase.validateUnitAvailability(
        unitId,
        body.checkIn,
        body.checkOut,
        bookingId,
      );
    }
  }

  private async validateCapacity(
    adultsCount: number | undefined,
    kidsCount: number | undefined,
    unit: string,
  ) {
    if (adultsCount || kidsCount)
      await this.bookingValidationUseCase.validateCapacity(
        adultsCount,
        kidsCount,
        unit,
      );
  }
}