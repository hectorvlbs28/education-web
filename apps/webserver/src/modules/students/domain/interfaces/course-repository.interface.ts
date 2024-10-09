import { IRepository } from '../../../core/domain/interfaces/repository';

export interface ICourseRespository<T> extends IRepository<T> {
  findAllCourses(): Promise<T[]>;
}
