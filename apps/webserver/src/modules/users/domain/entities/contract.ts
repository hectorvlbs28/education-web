import { Entity } from '../../../core/domain/entities/domain-entity';
import { Identifier } from '../../../core/domain/value-objects/identifier';
import { IContractToJsonResponse } from '../interfaces/contract-tojson-reponse.interface';
import { IMonthlyPayment } from '../interfaces/monthly-payment.interface';
import { Course } from './course';

export class Contract extends Entity {
  private readonly MILLISECONDS_IN_A_DAY: number;
  private _studentsNanme: string;
  private _schoolName: string;
  private _dateBirthStudent: Date;
  private _curp: string;
  private _studentPhone: string;
  private _scholarship: string;
  private _startDateService: Date;
  private _modality: string;
  private _annualRegistration: string;
  private _monthlyPayments: IMonthlyPayment[];
  private _documentId: string;
  private _signature: boolean;
  private _course: Course;
  private _activatedContract: boolean;
  private _discount: number;

  private constructor(id: Identifier) {
    super(id);
    this.MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;
  }

  public toJSON(): IContractToJsonResponse {
    return {
      id: this.id.toString(),
      annualRegistration: this._annualRegistration,
      curp: this._curp && this._curp,
      dateBirthStudent: this._dateBirthStudent,
      modality: this._modality,
      activatedContract: this._activatedContract,
      monthlyPayments: this._monthlyPayments,
      scholarship: this._scholarship,
      schoolName: this._schoolName,
      startDateService: this._startDateService,
      studentPhone: this._studentPhone,
      studentsNanme: this._studentsNanme,
      course: this._course && this._course.toJSON(),
      discount: this._discount && this._discount,
      documentId: this._documentId && this._documentId,
      signature: this._signature && this._signature,
      createdAt: this._createdAt,
    };
  }

  static hydrate(root: Partial<IContractToJsonResponse>): Contract {
    const contract = new Contract(new Identifier(root.id));
    contract._annualRegistration = root.annualRegistration;
    contract._curp = root.curp && root.curp;
    contract._dateBirthStudent = root.dateBirthStudent;
    contract._activatedContract = root.activatedContract;
    contract._modality = root.modality;
    contract._monthlyPayments = root.monthlyPayments;
    contract._scholarship = root.scholarship;
    contract._schoolName = root.schoolName;
    contract._startDateService = root.startDateService;
    contract._studentPhone = root.studentPhone;
    contract._studentsNanme = root.studentsNanme;
    contract._documentId = root.documentId && root.documentId;
    contract._signature = root.signature && root.signature;
    contract._course = root.course && Course.hydrate(root.course);
    contract._discount = root.discount && root.discount;
    return contract;
  }
}
