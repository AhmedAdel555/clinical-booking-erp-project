import { Type } from "class-transformer";
import { IsDate } from "class-validator";

export class BookingDTO {

  @Type(() => Date)
  @IsDate()
  day: Date;
}
