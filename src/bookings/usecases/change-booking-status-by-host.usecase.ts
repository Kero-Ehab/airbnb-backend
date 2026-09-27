import { BadRequestException, Injectable } from '@nestjs/common';
import { ChangeBookingStatusDto } from '../dtos/change-booking-status.dto';
import { CurrentUserData } from '../../auth/interfaces/principal.interface';
import { BookingResponseDto } from '../dtos/booking-response.dto';
import { BookingRepository } from '../repositories/booking.repository';
import { BookingParticipantAuthUsecase } from './booking-participant-auth.usecase';
import { FindOneUseCase } from './find-one.usecase';
import { BookingStatus } from '../enums/booking-status.enum';
import { CancelBy } from '../enums/cancel-by.enum';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ChangeBookingStatusByHostUseCase {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly bookingParticipantAuthUsecase: BookingParticipantAuthUsecase,
    private readonly findOneUsecase: FindOneUseCase,
  ) {}

  async execute(
    id: string,
    body: ChangeBookingStatusDto,
    user: CurrentUserData,
  ): Promise<BookingResponseDto> {
    const bookingToUpdate = await this.findOneUsecase.execute({ _id: id });

    this.bookingParticipantAuthUsecase.checkHostAuth(
      bookingToUpdate.host.toString(),
      user._id.toString(),
    );

    if (
      body.status === BookingStatus.CONFIRMED &&
      bookingToUpdate.status === BookingStatus.CONFIRMED
    )
      throw new BadRequestException('Booking already approved');

    if (body.status === BookingStatus.CANCELLED) {
      await this.updateBookingStatusToCancel(id, bookingToUpdate.status, body);
    }

    const updatedBooking = await this.bookingRepository.findByIdAndUpdate(
      id,
      {
        status: body.status,
      },
      { returnDocument: 'after', lean: true },
    );

    return plainToInstance(BookingResponseDto, updatedBooking);
  }

  private async updateBookingStatusToCancel(
    id: string,
    currentBookingStatus: BookingStatus,
    body: ChangeBookingStatusDto,
  ) {
    if (currentBookingStatus === BookingStatus.CANCELLED) {
      throw new BadRequestException('Booking already cancelled');
    }
    const updatedBooking = await this.bookingRepository.findByIdAndUpdate(
      id,
      {
        status: BookingStatus.CANCELLED,
        cancellationReason: body?.cancellationReason,
        cancellationDate: new Date(),
        cancellationBy: CancelBy.HOST,
      },
      { returnDocument: 'after', lean: true },
    );

    // TODO: Send email notification
    return plainToInstance(BookingResponseDto, updatedBooking);
  }
}