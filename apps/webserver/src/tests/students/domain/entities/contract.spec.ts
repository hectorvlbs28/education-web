import { IContractCreatePayload } from '../../../../modules/students/domain/interfaces/contract-create-payload.interface';
import { Identifier } from '../../../../modules/core/domain/value-objects/identifier';
import { Contract } from '../../../../modules/students/domain/entities/contract';
import { Student } from '../../../../modules/students/domain/entities/student';
import { Course } from '../../../../modules/students/domain/entities/course';

describe('Domain Contract UTest', () => {
  const course = Course.create({
    description: 'Curso de pruena',
    id: new Identifier('COR_asdyebhabshgduEEA'),
    name: 'Modas',
  });
  const payload: IContractCreatePayload = {
    id: new Identifier('CON_2iqQQetwWosWk0ZdW1Dar3jkYSv'),
    annualRegistration: '2950',
    dateBirthStudent: new Date('1998-07-05 16:27:13.005'),
    modality: 'A distancia',
    monthlyPayments: [
      { amount: '1800', level: '1', paymentDate: new Date('2024-08-10') },
    ],
    scholarship: 'Universitaria',
    schoolName: 'Urbe',
    startDateService: new Date(
      new Date('2024-08-10').toISOString().split('T')[0] + 'T23:59:59.999Z'
    ),

    studentPhone: '920802811',
    studentsNanme: 'David',
    curp: '147440001147752',
    activatedContract: true,
    course,
  };

  it('Validate instance of Contract', () => {
    const contract = Contract.create(payload);
    expect(contract).toBeInstanceOf(Contract);
  });

  it('Validate twentyPercentDiscount method if the payment is before paymentDate', () => {
    const contract = Contract.create(payload);
    const { discount, total } = contract.twentyPercentDiscount(
      new Date(
        new Date('2024-08-06').toISOString().split('T')[0] + 'T23:59:59.999Z'
      ),
      2950
    );
    const discountTest = Number(payload.annualRegistration) - 2950 * 0.8;
    expect(total).not.toBe(payload.annualRegistration);
    expect(discountTest).toBe(discount);
  });

  it('Validate thirtyPercentDiscount method if the payment is after paymentDate and after 5 days later', () => {
    const contract = Contract.create(payload);
    const { paymentFine } = contract.responseWithoutDiscounts(
      new Date(
        new Date('2024-08-22').toISOString().split('T')[0] + 'T23:59:59.999Z'
      ),
      '1'
    )[0];
    const penaltyFee = 1800 + 150;
    expect(paymentFine).toBe(penaltyFee.toString());
  });

  it('Validate thirtyPercentDiscount method if the payment is after paymentDate and after 30 days later but into 5 days', () => {
    const contract = Contract.create(payload);
    contract.thirtyPercentDiscount(
      new Date(
        new Date('2024-08-12').toISOString().split('T')[0] + 'T23:59:59.999Z'
      ),
      '1'
    );
    const { monthlyPayments } = contract.toJSON();
    expect(monthlyPayments[0].amount).toBe(payload.monthlyPayments[0].amount);
  });

  describe('Validate thirtyPercentDiscount method if it is 5 days before payment', () => {
    const data: IContractCreatePayload = {
      id: new Identifier('CON_2iqQQetwWosWk0ZdW1Dar3jkYSv'),
      annualRegistration: '2950',
      dateBirthStudent: new Date('1998-07-05 16:27:13.005'),
      modality: 'A distancia',
      monthlyPayments: [
        { amount: '1800', level: '1', paymentDate: new Date('2024-08-10') },
      ],
      scholarship: 'Universitaria',
      schoolName: 'Urbe',
      startDateService: new Date('2024-08-10'),
      studentPhone: '920802811',
      studentsNanme: 'David',
      curp: '147440001147752',
      course,
      activatedContract: true,
    };
    it('Validate thirtyPercentDiscount method if it is 5 days before payment', () => {
      const contract = Contract.create(data);
      const { fine, amount, discount } = contract.thirtyPercentDiscount(
        new Date(
          new Date('2024-08-07').toISOString().split('T')[0] + 'T23:59:59.999Z'
        ),
        '1'
      )[0];
      const { monthlyPayments } = contract.toJSON();
      const discountTest = Number(monthlyPayments[0].amount) - 1800 * 0.7;
      expect(discountTest).toBe(Number(discount));
    });
  });
});
