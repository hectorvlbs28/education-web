import { Injectable } from '@nestjs/common';
import { Course } from '../../domain/entities/course';
import { ICourseRespository } from '../../domain/interfaces/course-repository.interface';
import { BaseRepository } from '../../../core/infrastruture/repositories/base-repository';
import { DataSource } from 'typeorm';
import { CourseEntity } from '../../../core/infrastruture/entities/course.entity';

@Injectable()
export class CourseRepository
  extends BaseRepository<Course>
  implements Omit<ICourseRespository<Course>, 'persist'>
{
  private readonly aliasName: string = 'course';
  constructor(private readonly dataSource: DataSource) {
    super(Course, dataSource);
  }

  public async findById(id: string): Promise<Course> {
    const entity = await this.manager
      .createQueryBuilder(CourseEntity, this.aliasName)
      .where(`${this.aliasName}.id = :id`, { id })
      .getOne();
    return entity && Course.hydrate(entity);
  }

  public async findAllCourses(): Promise<Course[]> {
    const entities = await this.manager
      .createQueryBuilder(CourseEntity, this.aliasName)
      .getMany();

    return entities && entities.map((entity) => Course.hydrate(entity));
  }
}
