import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class StudentData {
  @ApiProperty()
  id: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  gender: string;

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

  @ApiPropertyOptional()
  fatherFullName?: string;

  @ApiProperty({ type: Date })
  createdAt: Date;
}

export class StudentResponseDto {
  @ApiProperty({ type: StudentData })
  data: StudentData;

  @ApiProperty()
  statusCode: number;
}
