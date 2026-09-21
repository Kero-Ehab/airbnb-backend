import { ApiProperty } from '@nestjs/swagger';

export class AvailabilityResponseDto {
  @ApiProperty({ description: 'Whether the unit is available', example: true })
  available: boolean;

  @ApiProperty({ description: 'Number of booked days', example: 4 })
  daysCount: number;

  @ApiProperty({ description: 'Unit price per day', example: 1200 })
  pricePerDay: number;

  @ApiProperty({ description: 'Booking amount before VAT', example: 4800 })
  bookingAmount: number; // price per day * days count

  @ApiProperty({ description: 'VAT amount', example: 672 })
  vatAmount: number; 

  @ApiProperty({ description: 'Total amount including VAT', example: 5472 })
  totalAmount: number; 
}