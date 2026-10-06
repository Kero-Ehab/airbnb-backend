import { GuestReviewDto } from '../dtos/guest-review.dto';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CurrentUserData } from '../../auth/interfaces/principal.interface';
import { BookingResponseDto } from '../dtos/booking-response.dto';
import { BookingRepository } from '../repositories/booking.repository';
import { FindOneUseCase } from './find-one.usecase';
import { BookingParticipantAuthUsecase } from './booking-participant-auth.usecase';
import { BookingStatus } from '../enums/booking-status.enum';
import { UnitReviewsService } from '../../unit-reviews/unit-reviews.service';
import { UnitsService } from 'src/unit/units.service';
import { plainToInstance } from 'class-transformer';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { BaseCustomException } from '../../common/errors-handling/custom-exceptions/base-custom.exception';

@Injectable()
export class ReviewBookingUseCase {
  private readonly logger = new Logger(ReviewBookingUseCase.name);

  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly findOneUsecase: FindOneUseCase,
    private readonly bookingParticipantAuthUsecase: BookingParticipantAuthUsecase,
    private readonly unitReviewsService: UnitReviewsService,
    private readonly unitsService: UnitsService,

    @InjectConnection()
    private readonly connection: Connection,
  ) {}
  async execute(
    id: string,
    body: GuestReviewDto,
    user: CurrentUserData,
  ): Promise<BookingResponseDto> {
    // 1. Find booking by id
    const booking = await this.findOneUsecase.execute({ _id: id });
    // 2. Check if booking belongs to the user guest
    this.bookingParticipantAuthUsecase.checkGuestAuth(
      booking.guest.toString(),
      user._id.toString(),
    );

    // 3. Make sure booking is completed
    if (booking.status !== BookingStatus.COMPLETED) {
      throw new BadRequestException(
        'Booking is not completed, you cannot submit a review',
      );
    }
    // 4. Make sure guest has not already reviewed
    if (booking?.guestReview) {
      throw new BadRequestException('Guest has already reviewed');
    }
    // Start Transaction - ACID
    const session = await this.connection.startSession();

    let updatedBooking: any;

    try {
      await session.withTransaction(async () => {
        // operation
        // 5. Update booking guest review -  booking schema - first operation
        updatedBooking = await this.bookingRepository.findByIdAndUpdate(
          id,
          { guestReview: body },
          { returnDocument: 'after', lean: true, session },
        );

        // 6. add record at unit-reviews collection - second operation
        await this.unitReviewsService.createUnitReview(
          {
            booking: id,
            unit: booking.unit,
            guest: booking.guest.toString(),
            rating: body.rating,
            comment: body.comment,
          },
          session,
        );

        // 7. update unit schema with rateCount, avgRate - third operation
        const { ratingCount, ratingAvg } =
          await this.unitReviewsService.calculateRatingAvg(
            booking.unit.toString(),
            session,
          );

        await this.unitsService.updateUnitAvgRateAndCount(
          {
            unitId: booking.unit.toString(),
            ratingCount,
            ratingAvg,
          },
          session,
        );
      });
    } catch (error) {
      await session.abortTransaction();
      this.logger.error(error);
      if (error instanceof BaseCustomException) throw error;
      throw new BadRequestException('Failed to review booking');
    } finally {
      // cleanup
      await session.endSession();
    }
    // 8. Commit Transaction
    return plainToInstance(BookingResponseDto, updatedBooking);
  }
}