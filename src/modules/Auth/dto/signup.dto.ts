import {
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  IsNotEmpty,
  Validate,
} from 'class-validator';


import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'IsPasswordEqualTo', async: false })
export class IsPasswordEqualTo implements ValidatorConstraintInterface {
  validate(confirmPassword: string, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const password = (args.object as any)[relatedPropertyName];
    return password === confirmPassword;
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    return `${relatedPropertyName} and confirmPassword should match`;
  }
}

export class SignUpDTO {

  @IsString()
  @MinLength(3, {
    message: 'your name must be at least 3 chars',
  })
  @MaxLength(10, {
    message: 'your name mustnot exceed 10 chars',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @Validate(IsPasswordEqualTo, ['password'])
  confirmPassword: string;

}
