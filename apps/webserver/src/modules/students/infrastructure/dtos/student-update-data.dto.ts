import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class AddresUpdateDataDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  zipCode?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  streetName?: string;
}

export class StudentUpdateDataDto {
  id: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  birthDate?: Date;

  @ApiPropertyOptional({ type: AddresUpdateDataDto })
  @ValidateNested()
  @Type(() => AddresUpdateDataDto)
  @IsOptional()
  address?: AddresUpdateDataDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  curp?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  lastDegreeStudy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;
  younger?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  studyModality?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fatherFullName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  avatar?: string;
}
