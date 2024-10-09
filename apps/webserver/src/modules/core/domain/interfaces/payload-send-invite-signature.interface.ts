export interface IPayloadSendInviteSignature {
  document_id: string;
  to: To[];
  from: string;
  cc?: string[];
  message: string;
  on_complete: string;
  subject: string;
  document_name?: string;
  client_timestamp: number;
  template: boolean;
  cc_step?: string[];
  viewers?: {
    message: string;
    subject: string;
    email: string;
    role: string;
    order: number;
  }[];
}

export interface To {
  email: string;
  role_id?: string;
  role?: string;
  order: number;
  expiration_days: number;
  subject: string;
  message: string;
  phone_invite?: string;
  reassign?: string;
  decline_by_signature?: string;
  reminder: {
    remind_before: number;
    remind_after: number;
    remind_repeat: number;
  };
  authentication: {
    type?: string;
  };
}
