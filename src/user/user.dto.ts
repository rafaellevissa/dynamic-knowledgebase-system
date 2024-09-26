import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from "class-validator";
import { UserRole } from "../common/data-types";

export class UserRegisterDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  public role: UserRole;


  constructor(payload: any) {
    this.name = payload?.name
    this.email = payload?.email;
    this.password = payload?.password;
    this.role = payload?.role;
  }
}

export class UserLoginDTO {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public password: string;


  constructor(payload: any) {
    this.email = payload?.email;
    this.password = payload?.password;
  }
}