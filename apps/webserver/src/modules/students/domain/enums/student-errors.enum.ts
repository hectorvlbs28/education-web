export enum StudentErrors {
  STUDENT_ALREADY_EXISTS = 'student-already-exists',
  CONTRACT_AMOUNT_ERROR = 'contract-amount-invalid',
  CONTRACT_AMOUNT_GREATER_THAN = 'amount-is-greater-than-in-contract',
  STUDENT_FILE_ERROR = 'file.type-invalid',
}

export enum ContractErrors {
  CONTRACT_SIGNATURE_ALREADY_EXIST = 'contract.signature-already-exists',
  CONTRACT_ACTIVED_EXIST = 'contract.actived-exist',
  CONTRACT_NOT_ACTIVATED = 'contract.not-activated',
}

export enum CourseErrors {
  COURSE_NOT_FOUND = 'course.not-found',
}
