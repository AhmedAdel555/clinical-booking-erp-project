import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class OrganizationDto {
  @IsString()
  @MinLength(3, {
    message: 'your name must be at leaset 3 chars',
  })
  @MaxLength(10, {
    message: 'your name mustnot exceed 10 chars',
  })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  License_ID: number;

  @IsNumber()
  @IsOptional()
  Financial_Limit_From?: number;

  @IsNumber()
  @IsOptional()
  Financial_Limit_TO?: number;

  @IsNumber()
  @IsOptional()
  Bank_account?: number;

}
