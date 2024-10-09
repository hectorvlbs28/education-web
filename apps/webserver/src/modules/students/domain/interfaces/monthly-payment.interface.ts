export interface IMonthlyPayment {
  level: string;
  amount: string;
  paymentDate: Date;
  paymentId?: string;
  paymentFine?: string;
  fine?: string;
  discount?: string;
}
