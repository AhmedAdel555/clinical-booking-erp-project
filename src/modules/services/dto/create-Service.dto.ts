import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateServiceDTO{

  @IsString()
  @IsNotEmpty()
  service_name: string;

  @IsString()
  @IsNotEmpty()
  service_description: string;

  @IsNumber()
  @IsNotEmpty()
  service_fees_amount: number;

  @IsString()
  @IsNotEmpty()
  service_fees_description: string
}