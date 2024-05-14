import { Injectable } from '@nestjs/common';
import { BookingDTO } from './dto/booking.dto';
import { Booking } from 'src/DB/Schemas/booking.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/DB/Schemas/user.schema';

@Injectable()
export class BookingsService {

  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
    @InjectModel(User.name) private userModel: Model<User>,
  ){}


  async bookDoctor(bookingDTO: BookingDTO, userId: string){
    
    const agent = await this.userModel.findById(bookingDTO.agentId).exec();
    
    if (!agent || !agent.available_dates.includes(bookingDTO.bookingDate)) {
      throw new Error('Agent is not available on the booking date');
    }

    agent.available_dates = agent.available_dates.filter(date => date !== bookingDTO.bookingDate);
    await agent.save();

    const createdBooking = new this.bookingModel({
      agent : agent,
      booking_date : bookingDTO.bookingDate,
      user : await this.userModel.findById(userId),
      vat : 5,
      total_payment : agent.service.service_fees_amount,
    });
    
    await createdBooking.save();

    return createdBooking;
  }

  async findAllUserBookedAppointments(userId: string){
    return this.bookingModel.find({ user: userId })
    .populate('service')
    .populate('agent')
    .exec();
  }

}
