import { IStudentCreateDomain } from 'apps/webserver/src/modules/students/domain/interfaces/student-create-domain.interface';
import { Identifier } from '../../../../modules/core/domain/value-objects/identifier';
import { Student } from '../../../../modules/students/domain/entities/student';
import { Email } from '../../../../modules/core/domain/value-objects/email';
import { User } from '../../../../modules/students/domain/entities/user';
import { Address } from '../../../../modules/students/domain/entities/address';
import { Course } from '../../../../modules/students/domain/entities/course';

describe('Domain student UTest', () => {
  const addresses = [
    Address.create({
      city: 'Lima',
      country: 'Perú',
      state: 'Chorrillos',
      streetName: 'Los Horizontez',
      zipCode: 15067,
      id: 1,
    }),
  ];
  const courses = [
    Course.create({
      description: 'Curso de pruena',
      id: new Identifier('COR_asdyebhabshgduEEA'),
      name: 'Modas',
    }),
  ];
  const payload: IStudentCreateDomain = {
    id: new Identifier('STD_2il48bVVSW9TvXKyKFPJn48L7gG'),
    fullName: 'Euro Caraballo',
    email: new Email({ email: 'euro2@test.com' }),
    gender: 'Hombre',
    birthDate: new Date('1984-07-03T23:41:06.721Z'),
    curp: '154778a878dasd',
    lastDegreeStudy: 'Universitario',
    phone: '9999999999',
    addresses,
    nationality: 'Venezolano',
    younger: false,
    fatherFullName: null,
    studyModality: 'A distancia',
    courses,
  };
  let student: Student;
  beforeEach(() => {
    student = Student.create(payload);
  });

  it('Validate instance of Student', () => {
    expect(student).toBeInstanceOf(Student);
  });

  it('Validate toJSON', () => {
    const { email, id, birthDate } = student.toJSON();
    expect(email).toBe(payload.email.toValue());
    expect(id).toBe(payload.id.toString());
    expect(birthDate).toBeInstanceOf(Date);
  });

  it('Validate method assignUser domain', () => {
    const addUser = User.hydrate({
      id: 'USR_2ikzPXvDJFz60mUitiUMpDWDAhV',
      name: 'David Escalante',
      email: 'david@boosteriit.com',
      createdAt: '2024-07-10T17:47:08.457Z',
    });
    student.assignUser(addUser);

    const { user } = student.toJSON();
    expect(user).toBeTruthy();
    expect(typeof user).toBe('object');
  });
});
