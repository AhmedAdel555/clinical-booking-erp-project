import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./Schemas/user.schema";
import { Organization, OrganizationSchema } from "./Schemas/organization.schema";
import { Catalog, CatalogSchema } from "./Schemas/catalog.schema";
import { Service, ServiceSchema } from "./Schemas/service.schema";
import { Booking, BookingSchema } from "./Schemas/booking.schema";

export const Models= MongooseModule.forFeature([
    { name:User.name , schema:UserSchema},
    { name:Organization.name , schema:OrganizationSchema},
    { name:Catalog.name , schema:CatalogSchema},
    { name:Service.name , schema:ServiceSchema},
    { name:Booking.name , schema:BookingSchema}
])