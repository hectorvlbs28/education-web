export type ApplicationConfigType = {
  secret: string;
  expiration: number;
  refreshSecret: string;
  refreshExpiration: number;
  redactedKeys: string;
};
