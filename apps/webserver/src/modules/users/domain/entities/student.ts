import { AggregateRoot } from '../../../core/domain/entities/aggregate-root';
import { Email } from '../../../core/domain/value-objects/email';
import { Identifier } from '../../../core/domain/value-objects/identifier';
import { IStudentReponseToJson } from '../interfaces/student-response-tojson.interface';
import { Address } from './address';
import { Course } from './course';

export class Student extends AggregateRoot {
  private _fullName: string;
  private _email: Email;
  private _gender: string;
  private _birthDate: Date;
  private _curp: string;
  private _lastDegreeStudy: string;
  private _phone: string;
  private _addresses: Address[];
  private _nationality: string;
  private _younger: boolean;
  private _studyModality: string;
  private _fatherFullName: string;
  private _courses: Course[];

  private constructor(id: Identifier) {
    super(id);
  }

  public toJSON(): IStudentReponseToJson {
    return {
      id: this.id.toString(),
      fullName: this._fullName,
      email: this._email.toValue(),
      gender: this._gender,
      birthDate: this._birthDate && this._birthDate,
      curp: this._curp && this._curp,
      lastDegreeStudy: this._lastDegreeStudy,
      phone: this._phone && this._phone,
      addresses: this._addresses && this._addresses.map((add) => add.toJSON()),
      courses: this._courses && this._courses.map((course) => course.toJSON()),
      nationality: this._nationality,
      younger: this._younger,
      fatherFullName: this._fatherFullName && this._fatherFullName,
      studyModality: this._studyModality,
      createdAt: this._createdAt,
    };
  }

  static hydrate(root: Partial<IStudentReponseToJson>) {
    const student = new Student(new Identifier(root.id));
    student._addresses =
      root.addresses && root.addresses.map((add) => Address.hydrate(add));
    student._curp = root.curp;
    student._email = new Email({ email: root.email });
    student._fatherFullName = root.fatherFullName && root.fatherFullName;
    student._fullName = root.fullName;
    student._gender = root.gender;
    student._lastDegreeStudy = root.lastDegreeStudy;
    student._nationality = root.nationality;
    student._phone = root.phone && root.phone;
    student._younger = root.younger;
    student._birthDate = root.birthDate;
    student._studyModality = root.studyModality;
    student._courses =
      root.courses && root.courses.map((course) => Course.hydrate(course));
    return student;
  }
}
