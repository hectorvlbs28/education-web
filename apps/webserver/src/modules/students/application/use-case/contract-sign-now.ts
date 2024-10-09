import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from '../../../core/domain/interfaces/use-case.interface';
import { ISignNowService } from '../../../core/domain/interfaces/docusign-service.interface';
import { SIGN_NOW_SERVICE } from '../../../core/infrastruture/constants/inject-tokens';
import {
  CONTRACT_REPOSITORY,
  STUDENT_REPOSITORY,
} from '../../infrastructure/constants/inject-tokens';
import { IContractRepository } from '../../domain/interfaces/contract-repository.interface';
import { Contract } from '../../domain/entities/contract';
import { ConfigService } from '@nestjs/config';
import { SignNowType } from '../../../config/types/signnow.type';
import { IPayloadPrefillDocument } from '../../domain/interfaces/payload-prefill-document.interface';
import { SignatureErrorException } from '../../domain/exceptions/signature.exception';
import { ContractErrors } from '../../domain/enums/student-errors.enum';
import { IPayloadCreateContractSignNow } from '../../domain/interfaces/payload-create-contract-sign-now';
import { IStudentRepository } from '../../domain/interfaces/student-repository.interface';
import { Student } from '../../domain/entities/student';

@Injectable()
export class ContractSignNow implements IUseCase {
  private documentId: string;
  constructor(
    @Inject(SIGN_NOW_SERVICE)
    private readonly signNowService: ISignNowService,
    @Inject(CONTRACT_REPOSITORY)
    private readonly contractRepository: IContractRepository<Contract>,
    @Inject(STUDENT_REPOSITORY)
    private readonly studentRepository: IStudentRepository<Student>,
    private readonly config: ConfigService
  ) {
    this.documentId = this.config.get<SignNowType>('signNow').documentId;
  }

  public async process(
    command: IPayloadCreateContractSignNow
  ): Promise<string> {
    const { contractId, studentId } = command;
    const contract = await this.contractRepository.findById(contractId);
    const student = await this.studentRepository.findById(studentId);
    const {
      schoolName,
      dateBirthStudent,
      curp,
      scholarship,
      startDateService,
      modality,
      createdAt,
      signature,
    } = contract.toJSON();
    if (signature) {
      throw new SignatureErrorException(
        ContractErrors.CONTRACT_SIGNATURE_ALREADY_EXIST
      );
    }
    const { fullName, addresses, phone, email } = student.toJSON();
    const { streetName, zipCode } = addresses.find((add) => add);
    const payload: IPayloadPrefillDocument = {
      fullName,
      schoolName,
      dateBirthStudent: this.formatDate(dateBirthStudent),
      curp,
      address: `${streetName} ${zipCode}`,
      phone,
      scholarship,
      startDateService: this.formatDate(startDateService),
      modality,
      createdAt: this.formatDate(createdAt),
      email,
    };
    const documentData = await this.signNowService.prefillDocumentFields(
      this.documentId,
      payload
    );
    const documentId = documentData.id;
    const roleId = await this.signNowService.getRoleIdByDocumentId(documentId);
    payload.roleId = roleId;
    const sendInvite = await this.signNowService.sendInviteSignature(
      documentId,
      payload
    );
    contract.assignDocumentId(sendInvite.documentIdByTemplate);
    await this.contractRepository.persist(contract);
    return this.signNowService.getUrlDocument(documentId);
  }

  private formatDate(date: Date) {
    const data = date
      .toLocaleDateString('es-MX', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .split('/');
    const [day, month, year] = data;
    return `${year}-${month}-${day}`;
  }
}
