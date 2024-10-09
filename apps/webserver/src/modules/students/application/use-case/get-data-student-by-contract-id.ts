import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from '../../../core/domain/interfaces/use-case.interface';
import { STUDENT_REPOSITORY } from '../../infrastructure/constants/inject-tokens';
import { IStudentRepository } from '../../domain/interfaces/student-repository.interface';
import { Student } from '../../domain/entities/student';
import { IPayloadDataStudent } from '../../domain/interfaces/payload-data-student.interface';

@Injectable()
export class GetDataStudentByContractId implements IUseCase {
  constructor(
    @Inject(STUDENT_REPOSITORY)
    private readonly studentRepository: IStudentRepository<Student>
  ) {}

  public async process(command: IPayloadDataStudent): Promise<Student> {
    const { contractId, userId, id } = command;
    return this.studentRepository.findStudentByUserIdAndContractId(
      userId,
      contractId,
      id
    );
  }
}
