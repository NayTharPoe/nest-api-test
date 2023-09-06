import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  readonly projectName: string;

  @IsString()
  @IsNotEmpty()
  readonly language: string;

  readonly description?: string;

  @IsString()
  @IsNotEmpty()
  readonly startDate: string;

  @IsString()
  @IsNotEmpty()
  readonly endDate: string;
}
