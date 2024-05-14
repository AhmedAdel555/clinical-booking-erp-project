import { IsMongoId, IsOptional } from "class-validator";
import { SignUpDTO } from "./signup.dto";

export class SignUpAdminDTO extends SignUpDTO{
  @IsMongoId()
  organizationId: string
}