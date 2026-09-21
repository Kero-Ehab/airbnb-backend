import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { AppSettingsService } from '../../app-settings/app-settings.service';
import { BookingCalculationResponse } from '../dtos/booking-calculation-response';
import { UnitsService } from 'src/unit/units.service';

@Injectable()
export class BookingCalculationUsecase {
  constructor(
    private readonly unitsService: UnitsService,
    private readonly appSettingsService: AppSettingsService,
  ) {}

  async execute(
    unitId: string,
    checkIn: Date | number,
    checkOut: Date | number,
  ): Promise<BookingCalculationResponse> {
    const daysCount = dayjs(checkOut).diff(dayjs(checkIn), 'day');
    const unit = await this.unitsService.findById(unitId);
    const pricePerDay = unit.costPerDay; // 100
    const bookingAmount = daysCount * pricePerDay; // 5 * 100 = 500
    const appSettings = await this.appSettingsService.find();
    const vatAmount = bookingAmount * (appSettings.vatRate / 100); // 500 * (10 / 100) = 50
    const totalAmount = bookingAmount + vatAmount; // 500 + 50 = 550

    return {
      pricePerDay,
      daysCount,
      vat: appSettings.vatRate,
      bookingAmount,
      vatAmount,
      totalAmount,
    };
  }
}