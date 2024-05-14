import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Organization {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  name: string;

  @Prop({
    type: Number,
    required: true,
    unique: true,
  })
  License_ID: number;
  
  @Prop({
    type: String,
    enum: ['Active', 'InActive'],
    default: 'Active',
  })
  Org_Status: string;

  @Prop({
    type: Number,
  })
  Financial_Limit_From: number;

  @Prop({
    type: Number,
  })
  Financial_Limit_TO: number;

  @Prop({
    type: Number,
  })
  Bank_account: number;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
