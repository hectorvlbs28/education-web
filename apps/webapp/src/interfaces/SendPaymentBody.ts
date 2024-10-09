interface SendPaymentBody {
  amount: number;
  currency: string;
  contractId: string;
  level: string;
  type: string;
}

export default SendPaymentBody;