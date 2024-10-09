import { ContractRepository } from '../repositories/contract.repository';
import { StripeService } from '../services/stripe.service';
import { CONTRACT_REPOSITORY, STRIPE_SERVICE } from './inject-tokens';

export const stripeService = {
  provide: STRIPE_SERVICE,
  useClass: StripeService,
};

export const contractRepository = {
  provide: CONTRACT_REPOSITORY,
  useClass: ContractRepository,
};
