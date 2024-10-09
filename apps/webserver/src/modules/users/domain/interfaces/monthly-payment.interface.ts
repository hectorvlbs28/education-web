export interface IMonthlyPayment {
  level: string;
  amount: string;
  paymentDate: Date;
  discount?: string;
}
