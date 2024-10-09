import { Module } from '@nestjs/common';
import {
  contractRepository,
  stripeService,
} from './infrastructure/constants/custom-providers';
import { StripeController } from './infrastructure/controllers/stripe.controller';
import { CreatePayment } from './application/use-case/create-payment';
import { AuthModule } from '../auth/auth.module';
import { WebhookStripeData } from './application/use-case/webhook-stripe-data';

@Module({
  controllers: [StripeController],
  imports: [AuthModule],
  providers: [
    stripeService,
    CreatePayment,
    WebhookStripeData,
    contractRepository,
  ],
})
export class StripeModule {}
