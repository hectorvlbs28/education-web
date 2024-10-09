import * as Joi from 'joi';

export const configSchema = Joi.object({
  APP_NAME: Joi.string().empty('').default('Application'),
  PORT: Joi.number().required(),
  MAIN_DB_TYPE: Joi.string().required(),
  MAIN_DB_HOST: Joi.string().required(),
  MAIN_DB_PORT: Joi.number().required(),
  MAIN_DB_USERNAME: Joi.string().required(),
  MAIN_DB_PASSWORD: Joi.string(),
  MAIN_DB_NAME: Joi.string().required(),
  MAIN_DB_LOGGING: Joi.number().required(),
  MAIN_DB_SYNC: Joi.number(),
  MAIN_DB_RUN_MIGRATIONS: Joi.number().required(),
  MIGRATIONS_PATH: Joi.string().required(),
  AUTH_SECRET: Joi.string().required(),
  AUTH_EXPIRATION: Joi.number().required(),
  REFRESH_SECRET: Joi.string().required(),
  REFRESH_EXPIRATION: Joi.number().required(),
  MAIL_HOST: Joi.string().required(),
  MAIL_PORT: Joi.number().required(),
  MAIL_USER: Joi.string().required(),
  MAIL_PASS: Joi.string().required(),
  REDACTED_KEYS: Joi.string().required(),
  BASE_URL_SIGNNOW: Joi.string().required(),
  SIGNNOW_USER_NAME: Joi.string().required(),
  SIGNNOW_PASSWORD: Joi.string().required(),
  CLIENT_ID: Joi.string().required(),
  CLIENT_SERCRET_KEY: Joi.string().required(),
  SIGN_NOW_DOCUMENT_ID: Joi.string().required(),
  BUCKET: Joi.string().required(),
  ACCESS_KEY: Joi.string().required(),
  SECRET_KEY: Joi.string().required(),
  STRIPE_SECRET_KEY: Joi.string().required(),
  STRIPE_ENDPOINT_SECRET: Joi.string().required(),
  STRIPE_ACCOUNT_ID: Joi.string().required(),
});
