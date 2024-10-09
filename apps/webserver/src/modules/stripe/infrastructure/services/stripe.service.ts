import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { Request } from 'express';

import { StripeType } from '../../../config/types/stripe.type';
import { IStripeService } from '../../domain/interfaces/stripe-service.interface';
import { IPayloadPayment } from '../../domain/interfaces/payload-payment.interface';
import { ILineItemEmailResponse } from '../../domain/interfaces/line-item-email.interdace';

@Injectable()
export class StripeService implements IStripeService {
  private stripe: Stripe;
  private endPointSecret: string;
  private accountId: string;

  constructor(private readonly config: ConfigService) {
    const secretKey = this.config.get<StripeType>('stripe').secretKey;
    this.stripe = new Stripe(secretKey, {
      apiVersion: '2024-06-20',
    });
    this.endPointSecret = this.config.get<StripeType>('stripe').endpointSecret;
    this.accountId = this.config.get<StripeType>('stripe').accountId;
  }

  public async createCustomer(email: string, name: string) {
    return await this.stripe.customers.create({
      email,
      name,
    });
  }

  public async createPaymentIntent(amount: number, currency: string) {
    const response = await this.stripe.paymentIntents.create({
      amount,
      currency,
    });
    return response.invoice;
  }

  public async getLineItem(
    paymentIntentId: string
  ): Promise<ILineItemEmailResponse> {
    const sessions = await this.stripe.checkout.sessions.list({
      payment_intent: paymentIntentId,
    });
    const {
      customer_details: { email, name },
    } = sessions.data[0];
    const session = sessions.data[0];
    const lineItems = await this.stripe.checkout.sessions.listLineItems(
      session.id
    );

    return {
      description: lineItems.data[0].description,
      email,
      amount: lineItems.data[0].amount_total,
      name,
    };
  }

  public async checkoutPayment(payload: IPayloadPayment): Promise<string> {
    const { amount, contractName, currency } = payload;
    const response = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: contractName,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://stripe.com/success',
      cancel_url: 'https://stripe.com/cancel',
    });
    return response.url;
  }

  public listeningEventsStripe(request: Request): string {
    const sig = request.headers['stripe-signature'];
    try {
      const event = this.stripe.webhooks.constructEvent(
        request.rawBody,
        sig,
        this.endPointSecret
      );
      let paymentIntentSucceeded: Stripe.PaymentIntent = null;
      switch (event.type) {
        case 'payment_intent.succeeded':
          paymentIntentSucceeded = event.data.object;
          return paymentIntentSucceeded.id;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
    } catch (error) {
      console.log(`Webhook signature verification failed.`, error);
      throw new Error(`Webhook Error: ${error.message}`);
    }
  }

  public async getEmailAccount(): Promise<string> {
    try {
      const account = await this.stripe.accounts.retrieve(this.accountId);
      return account.email;
    } catch (error) {
      console.error('Error retrieving Stripe account:', error);
      return null;
    }
  }
}
