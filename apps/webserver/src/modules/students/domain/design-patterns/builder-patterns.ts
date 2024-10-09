import { Identifier } from '../../../core/domain/value-objects/identifier';
import { Student } from '../entities/student';
import { IResponseToJsonAddress } from '../interfaces/payload-address-domain.interface';
import { IAddressUpdate } from '../interfaces/update-student-data.interface';

export class StudentBuilder {
  id: Identifier;
  fullName?: string;
  gender?: string;
  birthDate?: Date;
  addresses?: IAddressUpdate[];
  curp?: string;
  lastDegreeStudy?: string;
  phone?: string;
  nationality?: string;
  younger?: boolean;
  studyModality?: string;
  fatherFullName?: string;
  avatar?: string;

  constructor(id: Identifier) {
    this.id = id;
  }
  withFullName(fullName: string): StudentBuilder {
    this.fullName = fullName;
    return this;
  }

  withGender(gender: string): StudentBuilder {
    this.gender = gender;
    return this;
  }

  withBirthDate(birthDate: Date) {
    this.birthDate = birthDate;
    return this;
  }

  withAddresses(address: IAddressUpdate, addresses: IResponseToJsonAddress[]) {
    this.addresses = addresses.map((data) => {
      if (address) {
        data.city = address.city;
        data.country = address.country;
        data.state = address.state;
        data.streetName = address.streetName;
        data.zipCode = address.zipCode;
      }
      return data;
    });
    return this;
  }

  withCurp(curp: string) {
    this.curp = curp;
    return this;
  }

  withlastDegreeStudy(lastDegreeStudy: string) {
    this.lastDegreeStudy = lastDegreeStudy;
    return this;
  }

  withPhone(phone: string) {
    this.phone = phone;
    return this;
  }

  withNationality(nationality: string) {
    this.nationality = nationality;
    return this;
  }

  withStudyModality(studyModality: string) {
    this.studyModality = studyModality;
    return this;
  }

  withFatherFullName(fatherFullName: string) {
    this.fatherFullName = fatherFullName;
    return this;
  }

  withAvatar(avatar: string) {
    this.avatar = avatar;
    return this;
  }

  build(): Student {
    return Student.hydrate(this);
  }
}
