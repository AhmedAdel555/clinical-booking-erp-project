import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BookingDTO } from './dto/booking.dto';
import { Booking } from 'src/DB/Schemas/booking.schema';
import { Model, Types } from 'mongoose';
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
    
    const agent = await this.userModel.findById(bookingDTO.agentId).populate('service').populate('organization').exec();

    if (!agent || !agent.available_dates.some(date => date.getTime() === bookingDTO.bookingDate.getTime())) {
      throw new Error('Agent is not available on the booking date');
    }

    agent.available_dates = agent.available_dates.filter(date => date.getTime() !== bookingDTO.bookingDate.getTime());
    await agent.save();

    const currentUser = await this.userModel.findById(userId).exec();

    const createdBooking = new this.bookingModel({
      agent : agent,
      booking_date : bookingDTO.bookingDate,
      user : currentUser,
      vat : 2.5,
      total_payment : agent.service.service_fees_amount + (5 / 100 * agent.service.service_fees_amount),
    });
    
    const booking = await createdBooking.save();

    if(!booking){
      throw new InternalServerErrorException('fail to book');
    }

    await this.mailServer.sendMail(currentUser.email, `You Have Booked Dr: ${agent.username} at ${booking.booking_date} in ${agent.organization.name}`, "Clinical booking")

  }

  async findAllUserBookedAppointments(userId: string){
    return this.bookingModel.find({ user:  new Types.ObjectId(userId) })
    .populate({
      path: 'agent',
      populate: {
        path: 'service'
      }
    })
    .exec();
  }

  async findAppointmentsForAgentOnDay(agentId: string, day: Date): Promise<Booking[]> {
    return this.bookingModel.find({
      agent:  new Types.ObjectId(agentId),
      booking_date: {
        $gte: new Date(day.setHours(0, 0, 0)),
        $lt: new Date(day.setHours(23, 59, 59)),
      },
    }).populate('user')
      .exec();
  }

}
