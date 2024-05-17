import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Organization } from './organization.schema';
import { Catalog } from './catalog.schema';

@Schema()
export class Service {
  @Prop({ 
    type: Types.ObjectId, 
    ref: 'Organization',
    required: true
  })
  organization: Organization;

  @Prop({
    type: String,
    required: true
  })
  service_name: string;

  @Prop({
    type: String,
    required: true
  })
  service_description: string;

  @Prop({
    type: Number,
    required: true
  })
  service_fees_amount: number;

  @Prop({
    type: String,
    required: true
  })
  service_fees_description: string;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
