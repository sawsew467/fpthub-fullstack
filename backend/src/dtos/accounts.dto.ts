import { IsEmail, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateAccountDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public fullname: string;

  @IsString()
  public majorID: string;

  @IsString()
  public avatar: string;
}

export class AccountDto {
  @Expose()
  public email: string;
  
  @Expose()
  public fullname: string;

  
  @Expose()
  public majorID: string;
  
  @Expose()
  public avatar: string;
}

