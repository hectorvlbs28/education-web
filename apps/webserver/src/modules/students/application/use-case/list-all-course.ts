import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from '../../../core/domain/interfaces/use-case.interface';
import { COURSE_REPOSITORY } from '../../infrastructure/constants/inject-tokens';
import { ICourseRespository } from '../../domain/interfaces/course-repository.interface';
import { Course } from '../../domain/entities/course';

@Injectable()
export class ListAllCourse implements IUseCase {
  constructor(
    @Inject(COURSE_REPOSITORY)
    private readonly courseRepository: ICourseRespository<Course>
  ) {}

  public async process(): Promise<Course[]> {
    return this.courseRepository.findAllCourses();
  }
}
