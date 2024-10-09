import { Entity } from '../../../core/domain/entities/domain-entity';
import { Identifier } from '../../../core/domain/value-objects/identifier';
import { PaymentTypeEnum } from '../enums/payment-type.enum';
import { StatusCourseEnum } from '../enums/status-course.enum';
import { StudentErrors } from '../enums/student-errors.enum';
import { InvalidAmountException } from '../exceptions/invalid-amount.exception';
import { IContractCreatePayload } from '../interfaces/contract-create-payload.interface';
import { IContractToJsonResponse } from '../interfaces/contract-tojson-reponse.interface';
import { IMonthlyPayment } from '../interfaces/monthly-payment.interface';
import {
  IMonthlyPaymentUpdate,
  IResponsePercentPaymentRegister,
} from '../interfaces/response-percent-payment-register.interface';
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
  private _payment_annual_id: string;
  private _discount: number;
  private _status: StatusCourseEnum;

  private constructor(id: Identifier) {
    super(id);
    this.MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;
  }

  public assignDiscount(
    type: PaymentTypeEnum,
    discount?: number,
    monthlyPayment?: IMonthlyPaymentUpdate
  ) {
    if (type === PaymentTypeEnum.ANNUAL_REGISTRATION) {
      this._discount = discount;
    }
    if (type === PaymentTypeEnum.MONTHLY_PAYMENT) {
      this._monthlyPayments = this._monthlyPayments.map<IMonthlyPayment>(
        (data) => {
          if (data.level === monthlyPayment.level) {
            data.discount = monthlyPayment.discount.toString();
          }
          return data;
        }
      );
    }
  }

  public assignStatus(status: StatusCourseEnum) {
    this._status = status;
  }

  public toJSON(): IContractToJsonResponse {
    return {
      id: this.id.toString(),
      annualRegistration: this._annualRegistration,
      payment_annual_id: this._payment_annual_id && this._payment_annual_id,
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
      documentId: this._documentId && this._documentId,
      signature: this._signature && this._signature,
      discount: this._discount && this._discount,
      status: this._status,
      createdAt: this._createdAt,
    };
  }

  public assignDocumentId(documentId: string) {
    this._documentId = documentId;
  }

  public assignSignature() {
    this._signature = true;
  }

  public twentyPercentDiscount(
    annualPaymentDate: Date,
    amount: number
  ): IResponsePercentPaymentRegister {
    let discount = 0;
    const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;
    if (Number(this._annualRegistration) > amount) {
      throw new InvalidAmountException(StudentErrors.CONTRACT_AMOUNT_ERROR);
    }
    if (amount > Number(this._annualRegistration)) {
      throw new InvalidAmountException(
        StudentErrors.CONTRACT_AMOUNT_GREATER_THAN
      );
    }
    const daysDifference = Math.floor(
      (annualPaymentDate.getTime() -
        new Date(this._startDateService).getTime()) /
        MILLISECONDS_IN_A_DAY
    );

    if (daysDifference <= 30) {
      discount = Number(this._annualRegistration) * 0.8;
    }
    return {
      amount: Number(this._annualRegistration),
      discount: Number(this._annualRegistration) - discount,
      total: discount != 0 ? discount : Number(this._annualRegistration),
    };
  }

  public thirtyPercentDiscount(monthluPaymentDate: Date, level: string) {
    const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;
    return this._monthlyPayments.filter((payment) => {
      if (payment.level === level) {
        const daysDifference = Math.floor(
          (monthluPaymentDate.getTime() -
            new Date(payment.paymentDate).getTime()) /
            MILLISECONDS_IN_A_DAY
        );
        if (daysDifference >= -5 && daysDifference < 0) {
          const calculateAmount = Number(payment.amount) * 0.7;
          payment.discount = String(Number(payment.amount) - calculateAmount);
        }
        if (daysDifference > 10) {
          const amountWithFine = Number(payment.amount) + 150;
          payment.paymentFine = amountWithFine.toString();
          payment.fine = '150';
        }
        return payment;
      }
    });
  }

  public responseWithoutDiscounts(monthluPaymentDate: Date, level: string) {
    const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;
    return this._monthlyPayments.filter((payment) => {
      if (payment.level === level) {
        const daysDifference = Math.floor(
          (monthluPaymentDate.getTime() -
            new Date(payment.paymentDate).getTime()) /
            MILLISECONDS_IN_A_DAY
        );
        if (daysDifference > 10) {
          const amountWithFine = Number(payment.amount) + 150;
          payment.paymentFine = amountWithFine.toString();
          payment.fine = '150';
        }
        return payment;
      }
    });
  }

  static create(payload: IContractCreatePayload): Contract {
    const contract = new Contract(payload.id);
    contract._annualRegistration = payload.annualRegistration;
    contract._curp = payload.curp;
    contract._dateBirthStudent = payload.dateBirthStudent;
    contract._activatedContract = payload.activatedContract;
    contract._modality = payload.modality;
    contract._monthlyPayments = payload.monthlyPayments;
    contract._scholarship = payload.scholarship;
    contract._schoolName = payload.schoolName;
    contract._startDateService = payload.startDateService;
    contract._studentPhone = payload.studentPhone;
    contract._studentsNanme = payload.studentsNanme;
    return contract;
  }

  static hydrate(root: any): Contract {
    const contract = new Contract(new Identifier(root.id));
    contract._annualRegistration = root.annualRegistration;
    contract._payment_annual_id =
      root.payment_annual_id && root.payment_annual_id;
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
    contract._status = root.status;
    return contract;
  }
}
