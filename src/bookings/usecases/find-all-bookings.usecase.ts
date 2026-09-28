import { Injectable } from '@nestjs/common';
import { FindAllBookingsDto } from '../dtos/find-all-bookings.dto';
import { BookingResponseDto } from '../dtos/booking-response.dto';
import { PaginationResult } from 'src/common/data-access';
import { BookingRepository } from '../repositories/booking.repository';
import { plainToInstance } from 'class-transformer';
import { FindAllQueryBuilder } from '../query-builders/find-all-query-builder';

@Injectable()
export class FindAllBookingsUseCase {
  constructor(
    private readonly bookingsRepository: BookingRepository,
    private readonly findAllQueryBuilder: FindAllQueryBuilder,
  ) {}

  async execute(
    query: FindAllBookingsDto,
  ): Promise<PaginationResult<BookingResponseDto>> {
    const matchQuery = this.findAllQueryBuilder.buildMatchQuery(query);
    const sortQuery = this.findAllQueryBuilder.buildSortQuery(query);

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