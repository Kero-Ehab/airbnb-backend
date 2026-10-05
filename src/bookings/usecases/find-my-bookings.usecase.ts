import { Injectable } from '@nestjs/common';
import { FindAllBookingsDto } from '../dtos/find-all-bookings.dto';
import { PaginationResult } from 'src/common/data-access';
import { BookingResponseDto } from '../dtos/booking-response.dto';
import { BookingRepository } from '../repositories/booking.repository';
import { FindAllQueryBuilder } from '../query-builders/find-all-query-builder';
import { CurrentUserData } from '../../auth/interfaces/principal.interface';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FindMyBookingsUsecase {
  constructor(
    private readonly bookingsRepository: BookingRepository,
    private readonly findAllQueryBuilder: FindAllQueryBuilder,
  ) {}
  async execute(
    query: FindAllBookingsDto,
    currentUser: CurrentUserData,
  ): Promise<PaginationResult<BookingResponseDto>> {
    const matchQuery = this.findAllQueryBuilder.buildMatchQuery(query);
    const sortQuery = this.findAllQueryBuilder.buildSortQuery(query);

    if (query?.userType === 'guest') {
      matchQuery.guest = currentUser._id.toString();
    } else if (query?.userType === 'host') {
      matchQuery.host = currentUser._id.toString();
    } else {
      matchQuery.$or = [
        { guest: currentUser._id.toString() },
        { host: currentUser._id.toString() },
      ];
    }

    const results = await this.bookingsRepository.findPaginated(matchQuery, {
      page: query?.page,
      limit: query?.limit,
      ignoreLimit: query?.ignoreLimit,
      sort: sortQuery,
      lean: true,
      populate: [
        { path: 'unit', select: 'title' },
        { path: 'guest', select: 'name phoneNumber' },
        { path: 'host', select: 'name phoneNumber' },
      ],
    });

    return plainToInstance(PaginationResult<BookingResponseDto>, results);
  }
}