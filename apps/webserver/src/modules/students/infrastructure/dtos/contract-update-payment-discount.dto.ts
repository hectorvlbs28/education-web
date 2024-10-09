import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PaymentTypeEnum } from '../../domain/enums/payment-type.enum';
import { Type } from 'class-transformer';

class MonthlyPaymentContractDto {
  @ApiProperty()
  @IsString()
  level: string;

  @ApiProperty()
  @IsNumber()
  discount: number;
}

export class ContractUpdatePaymentDiscountDto {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  discount: number;

  @ApiProperty({ enum: PaymentTypeEnum })
  @IsEnum(PaymentTypeEnum)
  type: PaymentTypeEnum;

  @ApiPropertyOptional({ type: MonthlyPaymentContractDto })
  @ValidateNested()
  @Type(() => MonthlyPaymentContractDto)
  @IsOptional()
  monthlyPayment: MonthlyPaymentContractDto;

  contractId: string;
}
