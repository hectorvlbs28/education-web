import { HttpStatus } from '@nestjs/common';
import { IExceptionMapper } from '../../domain/interfaces/exception-mapper';
import { AUTH_ERRORS } from '../../infrastruture/constants/auth-errors.constant';
import { CORE_ERRORS } from '../../infrastruture/constants/core-exceptions';
import { USER_ERRORS } from '../../../users/infrastructure/constants/users-errors.constant';
import { TOKENS_ERRORS } from '../../../tokens/infrastructure/constants/tokens-errors.constant';
import { STUDENT_ERRORS } from '../../../students/infrastructure/constants/student-errors';

export class ExceptionHttpMapper implements IExceptionMapper {
  public map(exception) {
    const errorsCatalog = {
      ...AUTH_ERRORS,
      ...CORE_ERRORS,
      ...USER_ERRORS,
      ...TOKENS_ERRORS,
      ...STUDENT_ERRORS,
    };

    const defaultHttpInternalServerError = {
      error: exception.message,
      message: 'Internal Server Error',
      httpStatusCode: exception.status || HttpStatus.INTERNAL_SERVER_ERROR,
    };
    const httpErrorDefinition =
      exception.message in errorsCatalog
        ? errorsCatalog[exception.message]
        : defaultHttpInternalServerError;

    return {
      statusCode: httpErrorDefinition.httpStatusCode,
      error: exception.message,
      message: httpErrorDefinition.message,
      timestamp: new Date().toISOString(),
    };
  }
}
