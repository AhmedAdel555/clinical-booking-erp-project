import { ArrayMinSize, IsDate, IsMongoId, IsNotEmpty } from "class-validator";
import { SignUpDTO } from "./signup.dto";
import { Type } from "class-transformer";

export class SignUpAgentDTO extends SignUpDTO{

  @IsMongoId()
  catalog_id: string;

  @IsNotEmpty()
  cash_acceptance: boolean;

  @IsMongoId()
  serviceId: string;

  @Type(() => Date)
  @IsDate({ each: true })
  @ArrayMinSize(1)
  available_dates: Date[]
}