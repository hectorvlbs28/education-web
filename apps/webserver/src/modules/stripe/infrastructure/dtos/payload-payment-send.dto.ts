import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Currencies } from '../../../core/domain/enums/currencies.enum';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaymentTypeEnum } from '../../domain/enums/payment-type.enum';

export class PayloadPaymentSendDto {
  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty({ enum: Currencies })
  @IsEnum(Currencies)
  currency: Currencies;

  @ApiProperty()
  @IsString()
  contractId: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  level?: string;

  @ApiProperty({ enum: PaymentTypeEnum })
  @IsEnum(PaymentTypeEnum)
  type: PaymentTypeEnum;
}
