import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MonthlyPaymentResponseDto {
  @ApiProperty()
  level: string;

  @ApiProperty()
  amount: string;
}

export class StudentResponseContractDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  birthDate: string;

  @ApiProperty()
  curp: string;

  @ApiProperty()
  lastDegreeStudy: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  nationality: string;

  @ApiProperty()
  younger: boolean;

  @ApiProperty({
    nullable: true,
  })
  fatherFullName: string | null;

  @ApiProperty()
  studyModality: string;

  @ApiProperty()
  createdAt: string;
}

export class ContractDto {
  @ApiProperty()
  studentsNanme: string;

  @ApiProperty()
  schoolName: string;

  @ApiProperty({ type: Date })
  dateBirthStudent: Date;

  @ApiProperty()
  curp: string;

  @ApiProperty()
  studentPhone: string;

  @ApiProperty()
  scholarship: string;

  @ApiProperty({ type: Date })
  startDateService: Date;

  @ApiProperty()
  modality: string;

  @ApiProperty()
  annualRegistration: string;

  @ApiProperty({ type: [MonthlyPaymentResponseDto] })
  monthlyPayments: MonthlyPaymentResponseDto[];

  @ApiProperty({ type: StudentResponseContractDto })
  student: StudentResponseContractDto;

  @ApiPropertyOptional()
  documentId?: string;

  @ApiProperty()
  signature: boolean;
}

export class CreateContractResponseDto {
  @ApiProperty({ type: ContractDto })
  data: ContractDto;

  @ApiProperty({ description: 'Status code of the response' })
  statusCode: number;
}
