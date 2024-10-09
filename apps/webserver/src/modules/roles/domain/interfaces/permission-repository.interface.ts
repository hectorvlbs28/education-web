import { IRepository } from '../../../core/domain/interfaces/repository';

export interface IPermissionRepository<T> extends IRepository<T> {
  findByIds(ids: string[]): Promise<T[]>;
}
