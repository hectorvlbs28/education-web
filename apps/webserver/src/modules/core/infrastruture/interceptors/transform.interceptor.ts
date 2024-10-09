import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  data?: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data?: any) => {
        const response = context.switchToHttp().getResponse();

        if (data === undefined) {
          response.status(204);
          return;
        } else if (data === null) {
          response.status(404);
          return;
        } else if (JSON.stringify(data) === '{}') {
          response.status(204);
          return;
        }

        if (data.data && data.metadata) {
          return {
            metadata: data.metadata.plain(),
            data: data.data,
            statusCode: context.switchToHttp().getResponse().statusCode,
          };
        }
        return {
          data: data.entities ? data.entities : data,
          metadata: data.metadata ? data.metadata : undefined,
          statusCode: context.switchToHttp().getResponse().statusCode,
        };
      }),
    );
  }
}
