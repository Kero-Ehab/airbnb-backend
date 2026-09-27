import { BadRequestException, Injectable } from '@nestjs/common';
import { BookingRequestDto } from '../dtos/booking-request.dto';
import { BookingResponseDto } from '../dtos/booking-response.dto';
import { CurrentUserData } from '../../auth/interfaces/principal.interface';
import { BookingRepository } from '../repositories/booking.repository';
import { BookingValidationUseCase } from './booking-validation.usecase';
import { BookingCalculationUsecase } from './booking-calculation.usecase';
import dayjs from 'dayjs';
import { plainToInstance } from 'class-transformer';
import { UnitsService } from 'src/unit/units.service';

@Injectable()
export class BookingRequestUseCase {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly bookingValidationUseCase: BookingValidationUseCase,
    private readonly bookingCalculationUseCase: BookingCalculationUsecase,
    private readonly unitsService: UnitsService,
  ) {}
  async execute(
    body: BookingRequestDto,
    currentUser: CurrentUserData,
  ): Promise<BookingResponseDto> {
    const unit = await this.unitsService.findById(body.unit);
    if (unit.user === currentUser._id.toString())
      throw new BadRequestException('You cannot book your own unit');

    await this.bookingValidationUseCase.execute(body);
    const bookingCalculation = await this.bookingCalculationUseCase.execute(
      body.unit,
      body.checkIn,
      body.checkOut,
    );

    body.checkIn = dayjs(body.checkIn).toDate();
    body.checkOut = dayjs(body.checkOut).toDate();
    const bookingRequest = await this.bookingRepository.create({
      ...body,
      guest: currentUser._id.toString(),
      host: unit.user,
      daysCount: bookingCalculation.daysCount,
      bookingAmount: bookingCalculation.bookingAmount,
      vat: bookingCalculation.vat,
      vatAmount: bookingCalculation.vatAmount,
      totalAmount: bookingCalculation.totalAmount,
      pricePerDay: bookingCalculation.pricePerDay,
    });

    // TODO: Send email notification to the host (unit.user)

    return plainToInstance(BookingResponseDto, bookingRequest.toObject());
  }
}