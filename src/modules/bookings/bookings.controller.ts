import { Body, Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingDTO } from './dto/booking.dto';
import { AuthGuard } from '../Auth/auth.guard';

@Controller('bookings')
export class BookingsController {
  constructor(
    private bookingService: BookingsService
  ){}

  @UseGuards(AuthGuard)
  async bookDoctor(@Body() bookingDTO: BookingDTO, @Req() req){
    await this.bookingService.bookDoctor(bookingDTO, req.user.id)
  }

  @UseGuards(AuthGuard)
  async getUserBookedAppointments(@Req() req){
    return await this.bookingService.findAllUserBookedAppointments(req.user.id)
  }

  @UseGuards(AuthGuard)
  @Get('agent/bookings/:day')
  async getAppointmentsForAgentOnDay(@Req() req, @Param('day') day: string){
    return await this.bookingService.findAppointmentsForAgentOnDay(req.user.id, new Date(day));
  }
  
}
