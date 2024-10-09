export interface IMailProviderService {
  sendStudentConfirmation(user?: any, token?: string): Promise<void>;
  sendPaymentsConfirm(payload: IPayloadSendPayments): Promise<void>;
}

export interface IPayloadSendPayments {
  emailStripe: string;
  email: string;
  course: string;
  amount: number;
  name: string;
}
