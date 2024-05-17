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
    type: String,
    required: true,
    unique: true,
  })
  License_ID: string;
  
  @Prop({
    type: String,
    enum: ['Active', 'InActive'],
    required: true,
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
    type: String,
  })
  Bank_account: string;
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
