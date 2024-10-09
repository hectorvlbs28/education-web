export interface IMonthlyPayment {
  level: string;
  amount: string;
  paymentDate: Date;
  paymentId?: string;
  discount?: string;
}
