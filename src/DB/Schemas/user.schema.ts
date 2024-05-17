import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Organization } from './organization.schema';
import { Service } from './service.schema';
import { Catalog } from './catalog.schema';

export type RoleType = "Super Admin" | "Admin" | "Agent" | "User"

@Schema()
export class User {

  // for all users
  @Prop({
    type: String,
    unique: true,
  })
  NationalId: string;

  @Prop({
    type: String,
    required: true,
  })
  username: string;

  @Prop({
    type: String,
    unique: true,
    required: true,
  })
  phone: string;

  @Prop({
    unique: true,
    type: String,
    required: true,
  })
  email: string;
  
  @Prop({
    type: String,
    required: true,
    min: 3,
    max: 7
  })
  password: string;

  @Prop({
    type: String,
    enum: ['Active', 'InActive'],
    required: true,
    default: "Active"
  })
  status: string;

  @Prop({
    type: String,
    enum: ["Super Admin" , "Admin" , "Agent" , "User"],
    required: true,
  })
  role:RoleType;

  // for admis
  @Prop({
    type: { type: Types.ObjectId, ref: 'Organization' }
  })
  organization: Organization

  @Prop({
    type: { type: Types.ObjectId, ref: 'User' }
  })
  createdByUser: User

  @Prop(
    { type: Types.ObjectId, ref: 'Catalog' },
  )
  catalog: Catalog;

  @Prop({
    type: Boolean
  })
  cash_acceptance: boolean;

  @Prop({
    type: [Date],
  })
  available_dates: Date[]

  @Prop({
    type: { type: Types.ObjectId, ref: 'Service' }
  })
  service: Service
}

export const UserSchema = SchemaFactory.createForClass(User);
