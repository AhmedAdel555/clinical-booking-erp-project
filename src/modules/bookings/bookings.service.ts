import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BookingDTO } from './dto/booking.dto';
import { Booking } from 'src/DB/Schemas/booking.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/DB/Schemas/user.schema';
import { MailService } from '../notifications/mail.service';

@Injectable()
export class BookingsService {

  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
    @InjectModel(User.name) private userModel: Model<User>,
    private mailServer: MailService
  ){}


  async bookDoctor(bookingDTO: BookingDTO, userId: string){
    
    const agent = await (await this.userModel.findById(bookingDTO.agentId)).populated('service').populate('organization').exec();
    
    if (!agent || !agent.available_dates.includes(bookingDTO.bookingDate)) {
      throw new Error('Agent is not available on the booking date');
    }

    agent.available_dates = agent.available_dates.filter(date => date !== bookingDTO.bookingDate);
    await agent.save();

    const currentUser = await this.userModel.findById(userId).exec();

    const createdBooking = new this.bookingModel({
      agent : agent,
      booking_date : bookingDTO.bookingDate,
      user : currentUser,
      vat : 5,
      total_payment : agent.service.service_fees_amount - (5 / 100 * agent.service.service_fees_amount),
    });
    
    const booking = await createdBooking.save();

    if(!booking){
      throw new InternalServerErrorException('fail to book');
    }

    await this.mailServer.sendMail(currentUser.email, `You Have Booked Dr: ${agent.username} at ${booking.booking_date} in ${agent.organization.name}`, "Clinical booking")

  }

  async findAllUserBookedAppointments(userId: string){
    return this.bookingModel.find({ user: userId })
    .populate('service')
    .populate('agent')
    .exec();
  }

}
