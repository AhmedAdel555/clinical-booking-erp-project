import {
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';

export class SignInDto {

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

}
