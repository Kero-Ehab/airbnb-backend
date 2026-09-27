import { BadRequestException, Injectable } from '@nestjs/common';
import { BookingRepository } from '../repositories/booking.repository';
import { CancelBookingByGuestDto } from '../dtos/cancel-booking-by-guest.dto';
import { CurrentUserData } from '../../auth/interfaces/principal.interface';
import { BookingResponseDto } from '../dtos/booking-response.dto';
import { BookingParticipantAuthUsecase } from './booking-participant-auth.usecase';
import { FindOneUseCase } from './find-one.usecase';
import { BookingStatus } from '../enums/booking-status.enum';
import { CancelBy } from '../enums/cancel-by.enum';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CancelBookingByGuestUseCase {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly bookingParticipantAuthUsecase: BookingParticipantAuthUsecase,
    private readonly findOneUseCase: FindOneUseCase,
  ) {}

  async execute(
    id: string,
    body: CancelBookingByGuestDto,
    user: CurrentUserData,
  ): Promise<BookingResponseDto> {
    
    const booking = await this.findOneUseCase.execute({ _id: id });

    this.bookingParticipantAuthUsecase.checkGuestAuth(
      booking?.guest.toString(),
      user._id.toString(),
    );

    if (
      booking.status === BookingStatus.CANCELLED ||
      booking.status === BookingStatus.COMPLETED
    )
      throw new BadRequestException('Booking cannot be canceled');

    const updatedBooking = await this.bookingRepository.findOneAndUpdate(
      { _id: id },
      {
        status: BookingStatus.CANCELLED,
        cancellationReason: body?.cancellationReason,
        cancellationDate: new Date(),
        cancelBy: CancelBy.GUEST,
      },
      { returnDocument: 'after', lean: true },
    );

    return plainToInstance(BookingResponseDto, updatedBooking);
  }
}