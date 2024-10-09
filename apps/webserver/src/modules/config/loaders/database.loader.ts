import { registerAs } from '@nestjs/config';
import { DatabaseConfigType } from '../types/database.type';
import { configLoader } from './config.loader';

export const databaseConfigLoader = registerAs(
  'database',
  (): DatabaseConfigType => configLoader().database
);
