import { DomainException } from '../../../core/domain/exceptions/base/domain.exception';

export class CourseNotFoundException extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = CourseNotFoundException.name;
  }
}
