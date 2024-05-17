import { Body, Controller, Req, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingDTO } from './dto/booking.dto';
import { AuthGuard } from '../Auth/auth.guard';

@Controller('bookings')
export class BookingsController {
  constructor(
    private BookingService: BookingsService
  ){}

  @UseGuards(AuthGuard)
  async bookDoctor(@Body() bookingDTO: BookingDTO, @Req() req){
    await this.BookingService.bookDoctor(bookingDTO, req.user.id)
  }

  @UseGuards(AuthGuard)
  async getUserBookedAppointments(@Req() req){
    return await this.BookingService.findAllUserBookedAppointments(req.user.id)
  }

  
}
