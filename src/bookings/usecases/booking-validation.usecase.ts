import { BadRequestException, Injectable } from '@nestjs/common';
import { CheckAvailabilityDto } from '../dtos/check-availability.dto';
import dayjs from 'dayjs';
import { BookingRepository } from '../repositories/booking.repository';
import { BookingStatus } from '../enums/booking-status.enum';
import { BookingRequestDto } from '../dtos/booking-request.dto';
import { UnitsService } from 'src/unit/units.service';

@Injectable()
export class BookingValidationUseCase {
  constructor(
    private readonly unitsService: UnitsService,
    private readonly bookingRepository: BookingRepository,
  ) {}
  async execute(body: CheckAvailabilityDto | BookingRequestDto): Promise<void> {
    this.validateDateRange(body.checkIn, body.checkOut);
    await this.validateCapacity(body?.adultsCount, body?.kidsCount, body.unit);
    await this.validateUnitAvailability(body.unit, body.checkIn, body.checkOut);
  }

  async validateUnitAvailability(
    unit: string,
    checkIn: number | Date,
    checkOut: number | Date,
    bookingId?: string,
  ) {
    const overlappingBookings = await this.bookingRepository.find({
      unit: unit,
      status: { $in: [BookingStatus.PENDING, BookingStatus.CONFIRMED] },
      checkIn: { $lte: checkOut },
      checkOut: { $gte: checkIn },
      _id: { $ne: bookingId },
    });

    if (overlappingBookings.length > 0)
      throw new BadRequestException(
        'Unit is not available for the selected dates',
      );
  }

  async validateCapacity(
    adultsCount: number | undefined,
    kidsCount: number | undefined,
    unitId: string,
  ) {
    const unit = await this.unitsService.findById(unitId);

    if (adultsCount && adultsCount > unit.adultsCount) {
      throw new BadRequestException('unit capacity is not enough for adults');
    }
    if (kidsCount && kidsCount > unit.kidsCount)
      throw new BadRequestException('unit capacity is not enough for kids');
  }

  validateDateRange(checkIn: number | Date, checkOut: number | Date) {
    if (dayjs(checkIn).isAfter(checkOut)) {
      throw new BadRequestException(
        'Check-in date must be before check-out date',
      );
    }
  }
}