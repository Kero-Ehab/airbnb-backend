import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class BookingParticipantAuthUsecase {
  checkGuestAuth(bookingGuest: string, currentUser: string) {
    if (bookingGuest !== currentUser)
      throw new ForbiddenException(
        'You are not authorized to update this booking',
      );
  }

  checkHostAuth(bookingHost: string, currentUser: string) {
    if (bookingHost !== currentUser)
      throw new ForbiddenException(
        'You are not authorized to update this booking',
      );
  }
}