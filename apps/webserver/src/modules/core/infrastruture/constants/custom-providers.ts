import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HashEncryptor } from '../services/hash-encryptor';
import {
  AWS_SERVICE,
  EXCEPTION_MAPPER,
  HASHER,
  MAIL_PROVIDER_SERVICE,
  SIGN_NOW_SERVICE,
} from './inject-tokens';
import { TransformInterceptor } from '../interceptors/transform.interceptor';
import { CoreExceptionFilter } from '../filters/core-exception.filter';
import { ExceptionHttpMapper } from '../../application/services/exception-http-mapper';
import { MailProviderService } from '../services/mail-provider-service';
import { SignNowService } from '../services/signnow.service';
import { AwsService } from '../services/aws.service';

export const hasher = { provide: HASHER, useClass: HashEncryptor };
export const transformInterceptor = {
  provide: APP_INTERCEPTOR,
  useClass: TransformInterceptor,
};
export const exceptionFilter = {
  provide: APP_FILTER,
  useClass: CoreExceptionFilter,
};
export const exceptionMapper = {
  provide: EXCEPTION_MAPPER,
  useClass: ExceptionHttpMapper,
};

export const mailProviderService = {
  provide: MAIL_PROVIDER_SERVICE,
  useClass: MailProviderService,
};

export const signNowService = {
  provide: SIGN_NOW_SERVICE,
  useClass: SignNowService,
};

export const awsService = {
  provide: AWS_SERVICE,
  useClass: AwsService,
};
