import { Injectable } from '@nestjs/common';
import { CheckAvailabilityUseCase } from './usecases/check-availability.usecase';
import { AvailabilityResponseDto } from './dtos/availability-response.dto';
import { CheckAvailabilityDto } from './dtos/check-availability.dto';
import { BookingRequestUseCase } from './usecases/booking-request.usecase';
import { BookingRequestDto } from './dtos/booking-request.dto';
import { BookingResponseDto } from './dtos/booking-response.dto';
import { CurrentUserData } from '../auth/interfaces/principal.interface';
import { FindAllBookingsDto } from './dtos/find-all-bookings.dto';
import { PaginationResult } from 'src/common/data-access';
import { FindAllBookingsUseCase } from './usecases/find-all-bookings.usecase';
//import { FindMyBookingsUsecase } from './usecases/find-my-bookings.usecase';
import { FindByIdUseCase } from './usecases/find-by-id.usecase';
import { Principal } from '../auth/decorators/current-account.decorator';
import { UpdateBookingRequestDto } from './dtos/update-booking-request.dto';
//import { UpdateBookingByGuestUsecase } from './usecases/update-booking-by-guest.usecase';
import { CancelBookingByGuestDto } from './dtos/cancel-booking-by-guest.dto';
import { CancelBookingByGuestUseCase } from './usecases/cancel-booking-by-guest.usecase';
import { ChangeBookingStatusDto } from './dtos/change-booking-status.dto';
import { ChangeBookingStatusByHostUseCase } from './usecases/change-booking-status-by-host.usecase';
import { GuestReviewDto } from './dtos/guest-review.dto';
//import { ReviewBookingUseCase } from './usecases/review-booking.usecase';

@Injectable()
export class BookingsService {
  constructor(
    private readonly checkAvailabilityUseCase: CheckAvailabilityUseCase,
    private readonly createBookingUseCase: BookingRequestUseCase,
    private readonly findAllBookingsUseCase: FindAllBookingsUseCase,
    //private readonly findMyBookingsUseCase: FindMyBookingsUsecase,
    private readonly findByIdUseCase: FindByIdUseCase,
    //private readonly updateBookingByGuestUsecase: UpdateBookingByGuestUsecase,
    private readonly cancelBookingByGuestUseCase: CancelBookingByGuestUseCase,
    private readonly changeBookingStatusByHostUseCase: ChangeBookingStatusByHostUseCase,
    //private readonly reviewBookingUseCase: ReviewBookingUseCase,
  ) {}

  async checkAvailability(
    body: CheckAvailabilityDto,
  ): Promise<AvailabilityResponseDto> {
    return this.checkAvailabilityUseCase.execute(body);
  }

  async createBooking(
    body: BookingRequestDto,
    currentUser: CurrentUserData,
  ): Promise<BookingResponseDto> {
    return this.createBookingUseCase.execute(body, currentUser);
  }

  findAll(
    query: FindAllBookingsDto,
  ): Promise<PaginationResult<BookingResponseDto>> {
    return this.findAllBookingsUseCase.execute(query);
  }

//   findMine(
//     query: FindAllBookingsDto,
//     user: CurrentUserData,
//   ): Promise<PaginationResult<BookingResponseDto>> {
//     return this.findMyBookingsUseCase.execute(query, user);
//   }

  async findById(
    bookId: string,
    principal: Principal,
  ): Promise<BookingResponseDto> {
    return this.findByIdUseCase.execute(bookId, principal);
  }

//   updateByGuest(
//     id: string,
//     body: UpdateBookingRequestDto,
//     user: CurrentUserData,
//   ): Promise<BookingResponseDto> {
//     return this.updateBookingByGuestUsecase.execute(id, body, user);
//   }

  async cancelByGuest(
    id: string,
    body: CancelBookingByGuestDto,
    user: CurrentUserData,
  ): Promise<BookingResponseDto> {
    return this.cancelBookingByGuestUseCase.execute(id, body, user);
  }

  async changeStatusByHost(
    id: string,
    body: ChangeBookingStatusDto,
    user: CurrentUserData,
  ): Promise<BookingResponseDto> {
    return this.changeBookingStatusByHostUseCase.execute(id, body, user);
  }

//   async reviewBooking(
//     id: string,
//     body: GuestReviewDto,
//     user: CurrentUserData,
//   ): Promise<BookingResponseDto> {
//     return this.reviewBookingUseCase.execute(id, body, user);
//   }
}