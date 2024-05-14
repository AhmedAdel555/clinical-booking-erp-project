import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Organization } from './organization.schema';
import { Catalog } from './catalog.schema';

@Schema()
export class Service {
  @Prop(
    { type: Types.ObjectId, ref: 'Organization' },
  )
  organization: Organization;

  @Prop({
    type: String,
  })
  service_name: string;

  @Prop({
    type: String,
  })
  service_description: string;

  @Prop({
    type: Number,
  })
  service_fees_amount: number;

  @Prop({
    type: String,
  })
  service_fees_description: string
}

export const ServiceSchema = SchemaFactory.createForClass(Service);

