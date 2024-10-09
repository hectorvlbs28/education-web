import { Currencies } from '../../../core/domain/enums/currencies.enum';

export interface IPayloadPayment {
  amount: number;
  currency: Currencies;
  contractName: string;
}
