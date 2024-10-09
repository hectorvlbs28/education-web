import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class MonthlyPaymentDto {
  @ApiProperty()
  @IsString()
  level: string;

  @ApiProperty()
  @IsString()
  amount: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => Date)
  paymentDate: Date;
}

export class ContractStudentPayloadDto {
  @ApiProperty()
  @IsString()
  studentsNanme: string;

  @ApiProperty()
  @IsString()
  schoolName: string;

  @ApiProperty({ type: Date })
  @ValidateNested()
  @Type(() => Date)
  dateBirthStudent: Date;

  @ApiProperty()
  @IsString()
  curp: string;

  @ApiProperty()
  @IsString()
  studentPhone: string;

  @ApiProperty()
  @IsString()
  scholarship: string;

  @ApiProperty({ type: Date })
  @ValidateNested()
  @Type(() => Date)
  startDateService: Date;

  @ApiProperty()
  @IsString()
  modality: string;

  @ApiProperty()
  @IsString()
  annualRegistration: string;

  @ApiProperty({ type: [MonthlyPaymentDto] })
  @IsArray()
  @ValidateNested()
  @Type(() => MonthlyPaymentDto)
  monthlyPayments: MonthlyPaymentDto[];

  @ApiProperty()
  @IsString()
  courseId: string;

  studentId: string;
}
