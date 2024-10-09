import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from '../../../core/domain/interfaces/use-case.interface';
import { STUDENT_REPOSITORY } from '../../infrastructure/constants/inject-tokens';
import { IStudentRepository } from '../../domain/interfaces/student-repository.interface';
import { Student } from '../../domain/entities/student';
import { IPayloadUploadFileStudent } from '../../domain/interfaces/payload-upload-file-student';
import { Attachment } from '../../domain/entities/attachment';
import { AWS_SERVICE } from '../../../core/infrastruture/constants/inject-tokens';
import { IAwsService } from '../../../core/domain/interfaces/aws-service.interface';
import { ContractActiveException } from '../../domain/exceptions/contract.exception';
import { ContractErrors } from '../../domain/enums/student-errors.enum';
import { StatusCourseEnum } from '../../domain/enums/status-course.enum';

@Injectable()
export class UploadFileStudent implements IUseCase {
  constructor(
    @Inject(STUDENT_REPOSITORY)
    private readonly studentRepository: IStudentRepository<Student>,
    @Inject(AWS_SERVICE)
    private readonly awsService: IAwsService
  ) {}

  public async process(payload: IPayloadUploadFileStudent): Promise<Student> {
    const { attachments, files, studentId, courseId } = payload;
    const student = await this.studentRepository.findById(studentId);
    const courses = student.courses();
    const course = courses.find((course) => course.id.toString() === courseId);
    if (!course) {
      throw new ContractActiveException(ContractErrors.CONTRACT_NOT_ACTIVATED);
    }
    const newAttachment = attachments.map((attachment) =>
      Attachment.create(attachment)
    );
    course.assignAttachment(newAttachment);
    course.assignStatusContract(StatusCourseEnum.PRE_APPROVED);
    attachments.forEach((attachment) => {
      files.forEach(async (file) => {
        await this.awsService.putFile(attachment.fileName, file);
      });
    });
    return this.studentRepository.persist(student);
  }
}
