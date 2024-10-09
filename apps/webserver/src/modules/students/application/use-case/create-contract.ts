import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from '../../../core/domain/interfaces/use-case.interface';
import {
  CONTRACT_REPOSITORY,
  COURSE_REPOSITORY,
  STUDENT_REPOSITORY,
} from '../../infrastructure/constants/inject-tokens';
import { IContractRepository } from '../../domain/interfaces/contract-repository.interface';
import { Contract } from '../../domain/entities/contract';
import { IStudentRepository } from '../../domain/interfaces/student-repository.interface';
import { Student } from '../../domain/entities/student';
import { IContractCreateUseCase } from '../../domain/interfaces/contract-create-payload.interface';
import { ContractActiveException } from '../../domain/exceptions/contract.exception';
import {
  ContractErrors,
  CourseErrors,
} from '../../domain/enums/student-errors.enum';
import { CourseNotFoundException } from '../../domain/exceptions/course-not-found.exception';
import { ICourseRespository } from '../../domain/interfaces/course-repository.interface';
import { Course } from '../../domain/entities/course';

@Injectable()
export class CreateContract implements IUseCase {
  constructor(
    @Inject(CONTRACT_REPOSITORY)
    private readonly contractRepository: IContractRepository<Contract>,
    @Inject(STUDENT_REPOSITORY)
    private readonly studentRepository: IStudentRepository<Student>,
    @Inject(COURSE_REPOSITORY)
    private readonly courseRepository: ICourseRespository<Course>
  ) {}

  public async process(command: IContractCreateUseCase): Promise<Student> {
    const { studentId, courseId } = command;
    const course = await this.courseRepository.findById(courseId);
    const student = await this.studentRepository.findById(studentId);
    student.courses().forEach((courseStudent) => {
      if (courseStudent.id.toString() === course.id.toString()) {
        const { contracts } = courseStudent.toJSON();
        contracts.forEach((contract) => {
          if (contract) {
            if (contract.activatedContract) {
              throw new ContractActiveException(
                ContractErrors.CONTRACT_ACTIVED_EXIST
              );
            } else {
              const newContract = student.createContract(
                command,
                this.contractRepository
              );
              student.assignContractCourse(newContract);
              return this.studentRepository.persist(student);
            }
          }
        });
      }
    });
    student.assignCourse(course);
    const contract = student.createContract(command, this.contractRepository);
    student.assignContractCourse(contract);
    return this.studentRepository.persist(student);
  }
}
