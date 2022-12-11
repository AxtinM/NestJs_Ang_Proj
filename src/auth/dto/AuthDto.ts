import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export interface userType {
  sub: number;
  name: string;
  email: string;
  role?: string;
}
