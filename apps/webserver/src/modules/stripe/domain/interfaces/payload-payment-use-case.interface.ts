import { Currencies } from '../../../core/domain/enums/currencies.enum';
import { PaymentTypeEnum } from '../enums/payment-type.enum';

export interface IPayloadPaymentUseCase {
  amount: number;
  currency: Currencies;
  contractId: string;
  type: PaymentTypeEnum;
  level?: string;
}
