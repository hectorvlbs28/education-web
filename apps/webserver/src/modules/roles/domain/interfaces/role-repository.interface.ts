import { IRepository } from '../../../core/domain/interfaces/repository';

export interface IRoleRepository<T> extends IRepository<T> {
  softDeleteRole(id: string): Promise<boolean>;
}
