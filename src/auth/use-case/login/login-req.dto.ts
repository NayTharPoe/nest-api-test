import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import {ApiProperty} from '@nestjs/swagger'

export class LoginRequestDto{
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsString()
  password: string
}