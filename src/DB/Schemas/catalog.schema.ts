import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Catalog {

  @Prop({
    type: String,
    require: true,
    unique: true
  })
  catalog_name: string;

}

export const CatalogSchema = SchemaFactory.createForClass(Catalog);

