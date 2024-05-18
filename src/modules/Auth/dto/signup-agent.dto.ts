import { ArrayMinSize, IsDate, IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { SignUpDTO } from "./signup.dto";
import { Type } from "class-transformer";

export class SignUpAgentDTO extends SignUpDTO{

  @IsString()
  @IsNotEmpty()
  nationalId: string;

  @IsMongoId()
  catalogId: string;

  @IsNotEmpty()
  cashAcceptance: boolean;

  @IsMongoId()
  serviceId: string;

  @Type(() => Date)
  @IsDate({ each: true })
  @ArrayMinSize(1)
  availableDates: Date[]
}