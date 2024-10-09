import { registerAs } from '@nestjs/config';

import { configLoader } from './config.loader';
import { SignNowType } from '../types/signnow.type';

export const docusignConfigLoader = registerAs(
  'signNow',
  (): SignNowType => configLoader().signNow
);
