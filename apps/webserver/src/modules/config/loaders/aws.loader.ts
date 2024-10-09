import { registerAs } from '@nestjs/config';
import { configLoader } from './config.loader';
import { AwsType } from '../types/aws.type';

export const AwsConfigLoader = registerAs(
  'database',
  (): AwsType => configLoader().aws
);
