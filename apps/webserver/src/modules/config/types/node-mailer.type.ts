export type NodeMailerType = {
  host: string;
  port: number;
  auth: AuthDataType;
};

type AuthDataType = {
  user: string;
  pass: string;
};
