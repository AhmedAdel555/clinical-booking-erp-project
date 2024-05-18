import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateServiceDTO{

  @IsString()
  @IsNotEmpty()
  serviceName: string;

  @IsString()
  @IsNotEmpty()
  serviceDescription: string;

  @IsNumber()
  @IsNotEmpty()
  serviceFeesAmount: number;

  @IsString()
  @IsNotEmpty()
  serviceFeesDescription: string
}