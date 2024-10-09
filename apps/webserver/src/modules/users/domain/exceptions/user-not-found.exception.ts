import { DomainException } from '../../../core/domain/exceptions/base/domain.exception';

export class UserNotFoundException extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = UserNotFoundException.name;
  }
}
