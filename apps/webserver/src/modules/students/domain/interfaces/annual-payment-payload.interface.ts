export interface IPaymentPayload {
  id?: string;
  contractId: string;
  amount?: number;
  paymentDate: Date;
  level?: string;
}
