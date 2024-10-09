import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from '../../../core/domain/interfaces/use-case.interface';
import { STUDENT_REPOSITORY } from '../../infrastructure/constants/inject-tokens';
import { IStudentRepository } from '../../domain/interfaces/student-repository.interface';
import { Student } from '../../domain/entities/student';
import { IUpdateStudentData } from '../../domain/interfaces/update-student-data.interface';

@Injectable()
export class UpdateStudent implements IUseCase {
  constructor(
    @Inject(STUDENT_REPOSITORY)
    private readonly studentRepository: IStudentRepository<Student>
  ) {}

  public async process(payload: IUpdateStudentData): Promise<Student> {
    const student = await this.studentRepository.findById(payload.id);
    const { addresses } = student.toJSON();
    const response = student.Builder.withFullName(payload.fullName)
      .withGender(payload.gender)
      .withAddresses(payload.address, addresses)
      .withBirthDate(payload.birthDate)
      .withCurp(payload.curp)
      .withFatherFullName(payload.fatherFullName)
      .withPhone(payload.phone)
      .withStudyModality(payload.studyModality)
      .withlastDegreeStudy(payload.lastDegreeStudy)
      .withAvatar(payload.avatar)
      .build();
    return this.studentRepository.persist(response);
  }
}
