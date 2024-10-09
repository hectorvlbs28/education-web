import { AggregateRoot } from '../../../core/domain/entities/aggregate-root';
import { Email } from '../../../core/domain/value-objects/email';
import { Identifier } from '../../../core/domain/value-objects/identifier';
import { StudentBuilder } from '../design-patterns/builder-patterns';
import { IContractCreateUseCase } from '../interfaces/contract-create-payload.interface';
import { IContractRepository } from '../interfaces/contract-repository.interface';
import { IStudentCreateDomain } from '../interfaces/student-create-domain.interface';
import { IStudentReponseToJson } from '../interfaces/student-response-tojson.interface';
import { Address } from './address';
import { Attachment } from './attachment';
import { Contract } from './contract';
import { Course } from './course';
import { User } from './user';

export class Student extends AggregateRoot {
  private _fullName: string;
  private _email: Email;
  private _gender: string;
  private _birthDate: Date;
  private _addresses: Address[];
  private _curp: string;
  private _lastDegreeStudy: string;
  private _phone: string;
  private _nationality: string;
  private _younger: boolean;
  private _studyModality: string;
  private _fatherFullName: string;
  private _user: User;
  private _courses: Course[];
  private _attachments: Attachment[];
  private _avatar: string;

  private constructor(id: Identifier) {
    super(id);
  }

  public toJSON(): IStudentReponseToJson {
    return {
      id: this.id.toString(),
      fullName: this._fullName,
      email: this._email && this?._email.toValue(),
      gender: this._gender,
      birthDate: this._birthDate && this._birthDate,
      curp: this._curp && this._curp,
      lastDegreeStudy: this._lastDegreeStudy,
      phone: this._phone && this._phone,
      addresses:
        this._addresses && this._addresses.map((address) => address.toJSON()),
      nationality: this._nationality,
      younger: this._younger,
      fatherFullName: this._fatherFullName && this._fatherFullName,
      studyModality: this._studyModality,
      user: this._user && this._user.toJSON(),
      courses: this._courses && this._courses.map((course) => course.toJSON()),
      attachments:
        this._attachments &&
        this._attachments.map((attachment) => attachment.toJSON()),
      avatar: this._avatar && this._avatar,
      createdAt: this._createdAt,
    };
  }

  public assignUser(user: User) {
    this._user = user;
  }

  public courses(): Course[] {
    return this._courses && this._courses;
  }

  public assignAttachment(attachments: Attachment[]) {
    this._attachments = attachments;
  }

  public assignCourse(course: Course) {
    this._courses.push(course);
  }

  public assignContractCourse(newContract: Contract) {
    this._courses.filter((course) => {
      const findContract = course.contracts
        ? course.contracts.find(
            (contract) => !contract.toJSON().activatedContract
          )
        : null;
      if (!findContract) {
        course.assignContract(newContract);
      }
    });
  }

  public assignAvatar(avatar: string) {
    this._avatar = avatar;
  }

  public createContract(
    command: IContractCreateUseCase,
    contractRepository: IContractRepository<Contract>
  ): Contract {
    const contract = Contract.create({
      annualRegistration: command.annualRegistration,
      curp: command.curp,
      dateBirthStudent: new Date(
        new Date(command.dateBirthStudent).toISOString().split('T')[0] +
          'T23:59:59.999Z'
      ),
      id: contractRepository.nextId(),
      modality: command.modality,
      monthlyPayments: command.monthlyPayments.map((data) => {
        return {
          ...data,
          paymentDate: new Date(
            new Date(data.paymentDate).toISOString().split('T')[0] +
              'T23:59:59.999Z'
          ),
        };
      }),
      scholarship: command.scholarship,
      schoolName: command.schoolName,
      startDateService: new Date(
        new Date(command.startDateService).toISOString().split('T')[0] +
          'T23:59:59.999Z'
      ),
      studentPhone: command.scholarship,
      studentsNanme: command.studentsNanme,
      activatedContract: true,
    });
    return contract;
  }

  static create(payload: IStudentCreateDomain): Student {
    const student = new Student(payload.id);
    student._addresses = payload.addresses;
    student._curp = payload.curp;
    student._email = payload.email;
    student._fatherFullName = payload.fatherFullName && payload.fatherFullName;
    student._fullName = payload.fullName;
    student._gender = payload.gender;
    student._lastDegreeStudy = payload.lastDegreeStudy;
    student._nationality = payload.nationality;
    student._phone = payload.phone;
    student._younger = payload.younger;
    student._studyModality = payload.studyModality;
    student._birthDate = payload.birthDate;
    student._courses = payload.courses;
    return student;
  }

  static hydrate(root: any) {
    const student = new Student(new Identifier(root?.id));
    student._addresses =
      root?.addresses &&
      root?.addresses.map((address) => Address.hydrate(address));
    student._curp = root?.curp;
    student._email = root?.email && new Email({ email: root?.email });
    student._fatherFullName = root?.fatherFullName && root?.fatherFullName;
    student._fullName = root?.fullName;
    student._gender = root?.gender;
    student._lastDegreeStudy = root?.lastDegreeStudy;
    student._nationality = root?.nationality;
    student._phone = root?.phone && root?.phone;
    student._younger = root?.younger;
    student._birthDate = root?.birthDate;
    student._studyModality = root?.studyModality;
    student._user = root?.user && User.hydrate(root?.user);
    student._courses =
      root?.courses && root?.courses.map((course) => Course.hydrate(course));
    student._attachments =
      root?.attachments &&
      root?.attachments.map((attachment) => Attachment.hydrate(attachment));
    student._avatar = root.avatar && root.avatar;
    return student;
  }

  public get Builder() {
    return new StudentBuilder(this.id);
  }
}
