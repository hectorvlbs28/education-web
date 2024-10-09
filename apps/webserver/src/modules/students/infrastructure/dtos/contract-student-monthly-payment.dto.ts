import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ContractStudentPaymentDto {
  id: string;
  contractId: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  amount?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  level?: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => Date)
  paymentDate: Date;
}
