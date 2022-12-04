import { IsEmail, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateAccountDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class ReturnAccountDto {
  @Expose()
  public id: number

  @Expose()
  public email: string;
}
