import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { cloneDeepWith, isObject, toLower } from 'lodash';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StringUtils } from '../services/string-utils';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly config: ConfigService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<any>> {
    const httpRequest = context.switchToHttp().getRequest();
    const { headers, method: requestType, user, url: path } = httpRequest;
    const enterpriseId = user?.enterpriseId;
    const ip = httpRequest.connection.remoteAddress;
    const request = this.redactData(httpRequest.body);
    const status = context.switchToHttp().getResponse().statusCode;
    const userAgent = headers['user-agent'];
    const userRequest = user?.email || request?.email || 'anonymous';

    return next.handle().pipe(
      tap(async (responseBody) => {
        const logDto = {
          ip: ip || 'ND',
          path,
          userAgent,
          user: userRequest,
          request: JSON.stringify(request),
          requestType,
          status,
          response: StringUtils.customStringify(
            this.redactData(responseBody || {})
          ),
          enterpriseId,
        };
        return logDto;
      })
    );
  }

  redactData(data: Record<string, any>): Record<string, any> {
    const blacklist = String(this.config.get('application').redactedKeys).split(
      ','
    );
    return cloneDeepWith(data, (value, key) => {
      if (blacklist.includes(toLower(key))) {
        return '--REDACTED--';
      }

      if (isObject(value)) {
        return;
      }

      return value;
    });
  }
}
