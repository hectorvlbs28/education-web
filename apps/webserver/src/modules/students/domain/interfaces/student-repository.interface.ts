import { IRepository } from '../../../core/domain/interfaces/repository';
import { Identifier } from '../../../core/domain/value-objects/identifier';

export interface IStudentRepository<T> extends IRepository<T> {
  findByEmail(email: string): Promise<T>;
  findStudentByUserIdAndContractId(
    userId: string,
    contractId: string,
    id: string
  ): Promise<T>;
  prefixId(entityName: string): Identifier;
}
