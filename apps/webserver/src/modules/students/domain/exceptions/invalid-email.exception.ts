import { DomainException } from '../../../core/domain/exceptions/base/domain.exception';

export class StudentNotFoundException extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = StudentNotFoundException.name;
  }
}
