import { PaymentTypeEnum } from '../enums/payment-type.enum';

export interface IResponsePercentPaymentRegister {
  amount: number;
  discount: number;
  total: number;
}

export interface IPayloadUpdatePayment {
  contractId: string;
  amount?: number;
  discount?: number;
  monthlyPayment?: IMonthlyPaymentUpdate;
  type: PaymentTypeEnum;
}

export interface IMonthlyPaymentUpdate {
  level: string;
  amount?: number;
  discount: number;
}
