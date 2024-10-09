export interface IMonthlyPayment {
  level: string;
  amount: string;
  paymentDate: Date;
  paymentId?: string;
  type?: string;
  discount?: string;
}
