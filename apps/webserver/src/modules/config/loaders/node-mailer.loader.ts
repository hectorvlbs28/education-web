import { registerAs } from '@nestjs/config';

import { configLoader } from './config.loader';
import { NodeMailerType } from '../types/node-mailer.type';

export const nodeMailerConfigLoader = registerAs(
  'transport',
  (): NodeMailerType => configLoader().transport
);
