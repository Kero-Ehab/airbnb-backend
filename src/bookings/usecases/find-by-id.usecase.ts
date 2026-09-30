import { Injectable } from '@nestjs/common';
import { Principal } from '../../auth/decorators/current-account.decorator';
import { BookingResponseDto } from '../dtos/booking-response.dto';
import { Roles } from 'src/common/constants/roles.constants';
import { CheckBookingAuthUsecase } from './check-booking-auth.usecase';
import { BookingRepository } from '../repositories/booking.repository';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FindByIdUseCase {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly checkBookingAuthUsecase: CheckBookingAuthUsecase,
  ) {}

  async execute(
    bookId: string,
    principal: Principal,
  ): Promise<BookingResponseDto> {
    if (principal.role === Roles.USER)
      await this.checkBookingAuthUsecase.execute(bookId, principal.user._id);

    const booking = await this.bookingRepository.findById(bookId, {
      populate: [
        { path: 'unit', select: 'title' },
        { path: 'guest', select: 'name phoneNumber' },
        { path: 'host', select: 'name phoneNumber' },
      ],
    });
    return plainToInstance(BookingResponseDto, booking?.toObject());
  }
}