import { ApplicationConfigType } from '../types/application.type';
import { DatabaseConfigType } from '../types/database.type';
import { SignNowType } from '../types/signnow.type';
import { NodeMailerType } from '../types/node-mailer.type';
import { ServerConfigType } from '../types/server.type';
import { AwsType } from '../types/aws.type';
import { StripeType } from '../types/stripe.type';

export const configLoader = (): ConfigLoader => ({
  server: {
    port: parseInt(process.env.PORT, 10),
    applicationName: process.env.APP_NAME,
  },
  database: {
    type: process.env.MAIN_DB_TYPE,
    host: process.env.MAIN_DB_HOST,
    port: parseInt(process.env.MAIN_DB_PORT, 10),
    username: process.env.MAIN_DB_USERNAME,
    password: process.env.MAIN_DB_PASSWORD,
    database: process.env.MAIN_DB_NAME,
    logging: process.env.MAIN_DB_LOGGING === '1',
    synchronize: process.env.MAIN_DB_SYNC === '1',
    autoLoadEntities: true,
    migrationsTableName: 'migrations',
    migrationsPath: process.env.MIGRATIONS_PATH,
    runMigrations: process.env.MAIN_DB_RUN_MIGRATIONS === '1',
  },
  application: {
    secret: process.env.AUTH_SECRET,
    expiration: parseInt(process.env.AUTH_EXPIRATION, 10),
    refreshSecret: process.env.REFRESH_SECRET,
    refreshExpiration: parseInt(process.env.REFRESH_EXPIRATION, 10),
    redactedKeys: process.env.REDACTED_KEYS,
  },
  transport: {
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT, 10),
  },
  signNow: {
    baseUrl: process.env.BASE_URL_SIGNNOW,
    userName: process.env.SIGNNOW_USER_NAME,
    password: process.env.SIGNNOW_PASSWORD,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SERCRET_KEY,
    documentId: process.env.SIGN_NOW_DOCUMENT_ID,
  },
  aws: {
    accessKey: process.env.ACCESS_KEY,
    bucketName: process.env.BUCKET,
    secretKey: process.env.SECRET_KEY,
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    endpointSecret: process.env.STRIPE_ENDPOINT_SECRET,
    accountId: process.env.STRIPE_ACCOUNT_ID,
  },
});

type ConfigLoader = {
  server: ServerConfigType;
  database: DatabaseConfigType;
  application: ApplicationConfigType;
  transport: NodeMailerType;
  signNow: SignNowType;
  aws: AwsType;
  stripe: StripeType;
};
