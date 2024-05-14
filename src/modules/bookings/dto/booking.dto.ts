import { Type } from "class-transformer";
import { IsMongoId, IsDate } from "class-validator";

export class BookingDTO {
  @IsMongoId()
  agentId: string;

  @Type(() => Date)
  @IsDate()
  bookingDate: Date;
}
