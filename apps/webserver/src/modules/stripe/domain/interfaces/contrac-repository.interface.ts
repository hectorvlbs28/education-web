import { IRepository } from '../../../core/domain/interfaces/repository';

export interface IContractRepository<T>
  extends Omit<IRepository<T>, 'nextId'> {}
