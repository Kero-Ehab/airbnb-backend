import { Injectable } from '@nestjs/common';
import { CheckAvailabilityDto } from '../dtos/check-availability.dto';
import { AvailabilityResponseDto } from '../dtos/availability-response.dto';
import { BookingValidationUseCase } from './booking-validation.usecase';
import { BookingCalculationUsecase } from './booking-calculation.usecase';

@Injectable()
export class CheckAvailabilityUseCase {
  constructor(
    private readonly bookingValidationUseCase: BookingValidationUseCase,
    private readonly bookingCalculationUseCase: BookingCalculationUsecase,
  ) {}

  async execute(body: CheckAvailabilityDto): Promise<AvailabilityResponseDto> {
    await this.bookingValidationUseCase.execute(body);

    const bookingCalculation = await this.bookingCalculationUseCase.execute(
      body.unit,
      body.checkIn,
      body.checkOut,
    );

    return {
      available: true,
      ...bookingCalculation,
    };
  }
}