import { registerAs } from '@nestjs/config';
import { StripeType } from '../types/stripe.type';
import { configLoader } from './config.loader';

export const stripeConfigLoader = registerAs(
  'stripe',
  (): StripeType => configLoader().stripe
);
