import { DomainException } from '../../../core/domain/exceptions/base/domain.exception';

export class UserExistException extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = UserExistException.name;
  }
}
