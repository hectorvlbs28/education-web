import { ILineItemEmailResponse } from './line-item-email.interdace';
import { IPayloadPayment } from './payload-payment.interface';

export interface IStripeService {
  createPaymentIntent(amount: number, currency: string): Promise<any>;
  checkoutPayment(payload: IPayloadPayment): Promise<string>;
  listeningEventsStripe(request: any): string;
  getLineItem(paymentIntentId: string): Promise<ILineItemEmailResponse>;
  getEmailAccount(): Promise<string>;
}
