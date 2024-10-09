import { ContractRepository } from '../repositories/contract.repository';
import { CourseRepository } from '../repositories/course.repository';
import { StudentRepository } from '../repositories/student.repository';
import { UserRepository } from '../repositories/user.repository';
import {
  CONTRACT_REPOSITORY,
  COURSE_REPOSITORY,
  STUDENT_REPOSITORY,
  USER_REPOSITORY,
} from './inject-tokens';

export const studentRepository = {
  provide: STUDENT_REPOSITORY,
  useClass: StudentRepository,
};

export const userRepository = {
  provide: USER_REPOSITORY,
  useClass: UserRepository,
};

export const contractRepository = {
  provide: CONTRACT_REPOSITORY,
  useClass: ContractRepository,
};

export const courseRepository = {
  provide: COURSE_REPOSITORY,
  useClass: CourseRepository,
};
