import { DomainException } from '../../../core/domain/exceptions/base/domain.exception';

export interface CoreErrorVisitor {
  visitDomainException(exception: DomainException): boolean;
  visitMultiDomainException(exception: DomainException): boolean;
  visitUnexpectedError(exception: Error): boolean;
}
