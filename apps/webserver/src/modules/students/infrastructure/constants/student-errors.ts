import {
  ContractErrors,
  CourseErrors,
  StudentErrors,
} from '../../domain/enums/student-errors.enum';

export const STUDENT_ERRORS = {
  [StudentErrors.STUDENT_ALREADY_EXISTS]: {
    message: 'student already exists',
    httpStatusCode: 400,
  },
  [StudentErrors.CONTRACT_AMOUNT_ERROR]: {
    message: 'Contract annual amount is incorrect',
    httpStatusCode: 400,
  },
  [StudentErrors.CONTRACT_AMOUNT_GREATER_THAN]: {
    message: 'The Amount is greater than in the contract',
    httpStatusCode: 400,
  },
  [ContractErrors.CONTRACT_SIGNATURE_ALREADY_EXIST]: {
    message: 'The Contract already has a signature',
    httpStatusCode: 400,
  },
  [StudentErrors.STUDENT_FILE_ERROR]: {
    message: 'Invalid type file',
    httpStatusCode: 413,
  },
  [ContractErrors.CONTRACT_ACTIVED_EXIST]: {
    message: 'Has activated contract',
    httpStatusCode: 400,
  },
  [ContractErrors.CONTRACT_NOT_ACTIVATED]: {
    message: 'Does not have an activated contract',
    httpStatusCode: 400,
  },
  [CourseErrors.COURSE_NOT_FOUND]: {
    message: 'Course not found in the student profile',
    httpStatusCode: 404,
  },
};
