import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from './user.schema';

@Schema()
export class Booking {

  @Prop({
    type: Date,
    require: true,
  })
  booking_date: Date;

  @Prop({
    type: Types.ObjectId, 
    ref: 'User',
    require: true,
  })
  user: User

  @Prop({
    type: Types.ObjectId, 
    ref: 'User',
    require: true,
  })
  agent: User

  @Prop({
    type: Number,
    require: true,
  })
  vat: number

  @Prop({
    type: Number,
    require: true,
  })
  total_payment: number

}

export const BookingSchema = SchemaFactory.createForClass(Booking);

