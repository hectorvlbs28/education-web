import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from '../../../core/domain/interfaces/use-case.interface';
import {
  COURSE_REPOSITORY,
  STUDENT_REPOSITORY,
  USER_REPOSITORY,
} from '../../infrastructure/constants/inject-tokens';
import { IStudentRepository } from '../../domain/interfaces/student-repository.interface';
import { Student } from '../../domain/entities/student';
import { IStudentPayload } from '../../domain/interfaces/student-payload.interface';
import { StudentNotFoundException } from '../../domain/exceptions/invalid-email.exception';
import { StudentErrors } from '../../domain/enums/student-errors.enum';
import { Email } from '../../../core/domain/value-objects/email';
import { MAIL_PROVIDER_SERVICE } from '../../../core/infrastruture/constants/inject-tokens';
import { IMailProviderService } from '../../../core/domain/interfaces/mail-provider-service.interface';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { User } from '../../domain/entities/user';
import { Course } from '../../domain/entities/course';
import { Address } from '../../domain/entities/address';
import { ICourseRespository } from '../../domain/interfaces/course-repository.interface';

@Injectable()
export class CreateStudent implements IUseCase {
  constructor(
    @Inject(STUDENT_REPOSITORY)
    private readonly studentRepository: IStudentRepository<Student>,
    @Inject(MAIL_PROVIDER_SERVICE)
    private readonly mailProvideService: IMailProviderService,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository<User>,
    @Inject(COURSE_REPOSITORY)
    private readonly courseRepository: ICourseRespository<Course>
  ) {}

  public async process(payload: IStudentPayload): Promise<Student> {
    const student = await this.studentRepository.findByEmail(payload.email);
    const course = await this.courseRepository.findById(payload.courseId);
    if (student) {
      throw new StudentNotFoundException(StudentErrors.STUDENT_ALREADY_EXISTS);
    }
    const user = await this.userRepository.findById(payload.userId);
    const address = Address.create(payload.address);
    const newStudent = Student.create({
      id: this.studentRepository.nextId(),
      email: new Email({ email: payload.email }),
      addresses: [address],
      curp: payload.curp,
      fullName: payload.fullName,
      gender: payload.gender,
      lastDegreeStudy: payload.lastDegreeStudy,
      nationality: payload.nationality,
      phone: payload.phone,
      younger: payload.younger,
      fatherFullName: payload.fatherFullName,
      studyModality: payload.studyModality,
      birthDate: new Date(
        new Date(payload.birthDate).toISOString().split('T')[0] +
          'T23:59:59.999Z'
      ),
      courses: [course],
    });
    newStudent.assignUser(user);
    await this.mailProvideService.sendStudentConfirmation(payload.email);
    return this.studentRepository.persist(newStudent);
  }
}
