import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

class Address {
  @ApiProperty()
  @IsNumber()
  zipCode: number;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsString()
  streetName: string;
}
export class StudentPayloadDto {
  @ApiProperty()
  @IsString()
  @MaxLength(50, { message: 'The string cannot be longer than 50 characters' })
  fullName: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  gender: string;

  @ApiProperty({ type: Date })
  @IsString()
  birthDate: Date;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  curp: string;

  @ApiProperty()
  @IsString()
  @MaxLength(50, { message: 'The string cannot be longer than 50 characters' })
  lastDegreeStudy: string;

  @ApiPropertyOptional()
  @IsString()
  @MaxLength(10, { message: 'The string cannot be longer than 50 characters' })
  @IsOptional()
  phone: string;

  @ApiProperty({ type: Address })
  @ValidateNested()
  @Type(() => Address)
  address: Address;

  @ApiProperty()
  @IsString()
  nationality: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  younger: boolean;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  fatherFullName?: string;

  @ApiProperty()
  @IsString()
  studyModality: string;

  @ApiProperty()
  @IsString()
  courseId: string;

  userId: string;
}
