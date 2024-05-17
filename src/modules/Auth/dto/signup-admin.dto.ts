import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { SignUpDTO } from "./signup.dto";

export class SignUpAdminDTO extends SignUpDTO{

  @IsString()
  @IsNotEmpty()
  NationalId: string;

  @IsMongoId()
  organizationId: string
}