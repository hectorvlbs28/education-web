import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import { CreateStudent } from '../../application/use-case/create-student';
import { StudentPayloadDto } from '../dtos/student-payload.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StudentResponseDto } from '../dtos/student-response.dto';
import { LoginGuard } from '../../../auth/infrastructure/guards/login.guard';
import { UserId } from '../../../core/infrastruture/decorators/get-user-id.decorator';
import { CreateContract } from '../../application/use-case/create-contract';
import { ContractStudentPayloadDto } from '../dtos/contract-student-payload.dto';
import { CreateContractResponseDto } from '../dtos/contract-student-response.dto';
import { AnnualPayment } from '../../application/use-case/annual-payment';
import { ContractStudentPaymentDto } from '../dtos/contract-student-monthly-payment.dto';
import { MonthlyPayment } from '../../application/use-case/monthly-payment';
import { ContractSignNow } from '../../application/use-case/contract-sign-now';
import { GetContractById } from '../../application/use-case/get-contract-by-id';
import { UploadFileStudent } from '../../application/use-case/upload-file-student';
import {
  IAttachmentPayload,
  IPayloadUploadFileStudent,
} from '../../domain/interfaces/payload-upload-file-student';
import { IFilesData } from '../../domain/interfaces/files-data.interface';
import { InvalidFileTypeException } from '../../domain/exceptions/invalid-file-type.exception';
import { StudentErrors } from '../../domain/enums/student-errors.enum';
import { GetDataStudentByContractId } from '../../application/use-case/get-data-student-by-contract-id';
import { IPayloadCreateContractSignNow } from '../../domain/interfaces/payload-create-contract-sign-now';
import { ListAllCourse } from '../../application/use-case/list-all-course';
import { UpdatePaymentContract } from '../../application/use-case/update-payment-contract';
import { ContractUpdatePaymentDiscountDto } from '../dtos/contract-update-payment-discount.dto';
import { Roles } from '../../../core/infrastruture/decorators/get-role.decorator';
import { RoleEnum } from '../../../core/domain/enums/roles.enum';
import { RolesGuard } from '../../../auth/infrastructure/guards/roles.guard';
import { UpdateStudent } from '../../application/use-case/update-student';
import { StudentUpdateDataDto } from '../dtos/student-update-data.dto';

@ApiBearerAuth('JWT')
@ApiTags('Students')
@Controller('student')
@UseGuards(LoginGuard, RolesGuard)
export class StudentController {
  private readonly regExp: RegExp = /^(.*?)(\.[^.]*$|$)/;
  constructor(
    private readonly createStudent: CreateStudent,
    private readonly createContractStuden: CreateContract,
    private readonly annualPayment: AnnualPayment,
    private readonly monthlyPayment: MonthlyPayment,
    private readonly contracSignNow: ContractSignNow,
    private readonly getContractById: GetContractById,
    private readonly uploadFileStudent: UploadFileStudent,
    private readonly getDataStudentByContractId: GetDataStudentByContractId,
    private readonly listAllCourse: ListAllCourse,
    private readonly updatePaymentContract: UpdatePaymentContract,
    private readonly updateStudent: UpdateStudent
  ) {}

  @ApiResponse({ type: StudentResponseDto })
  @Post('/')
  @Roles(RoleEnum.STUDENT)
  public create(@Body() payload: StudentPayloadDto, @UserId() userId: string) {
    payload.userId = userId;
    return this.createStudent.process(payload);
  }

  @ApiResponse({ type: CreateContractResponseDto })
  @Post('/:id/contracts')
  @Roles(RoleEnum.STUDENT)
  public async createContract(
    @Param('id') id: string,
    @Body() payload: ContractStudentPayloadDto
  ) {
    payload.studentId = id;
    return this.createContractStuden.process(payload);
  }

  @Post('/contract/:contractId/annual')
  @Roles(RoleEnum.STUDENT)
  public async addAnnualPayment(
    @Param('contractId') contractId: string,
    @Body() payload: ContractStudentPaymentDto
  ) {
    payload.contractId = contractId;
    return this.annualPayment.process(payload);
  }

  @Put('/contract/:contractId/')
  @Roles(RoleEnum.STUDENT)
  public async updateContractDiscount(
    @Param('contractId') contractId: string,
    @Body() payload: ContractUpdatePaymentDiscountDto
  ) {
    payload.contractId = contractId;
    return this.updatePaymentContract.process(payload);
  }

  @Post('/contract/:contractId/monthly')
  @Roles(RoleEnum.STUDENT)
  public async addMonthlyPayment(
    @Param('contractId') contractId: string,
    @Body() payload: ContractStudentPaymentDto
  ) {
    payload.contractId = contractId;
    return this.monthlyPayment.process(payload);
  }

  @Get('/:studentId/contract/:id')
  @Roles(RoleEnum.STUDENT)
  public async contract(
    @Param('id') id: string,
    @Param('studentId') studentId: string
  ) {
    const payload: IPayloadCreateContractSignNow = {
      contractId: id,
      studentId,
    };
    return this.contracSignNow.process(payload);
  }

  @ApiResponse({ type: CreateContractResponseDto })
  @Roles(RoleEnum.STUDENT)
  @Get('/contract/:id/document')
  public async contractWithDocument(@Param('id') id: string) {
    return this.getContractById.process(id);
  }

  @Post('/:studentId/course/:courseId')
  @Roles(RoleEnum.STUDENT)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'files', maxCount: 6 }]))
  public async putFileStudent(
    @Param('studentId') studentId: string,
    @Param('courseId') courseId: string,
    @UploadedFiles() files: IFilesData,
    @Body('types') types: string
  ) {
    if (!files.files) {
      throw new InvalidFileTypeException(StudentErrors.STUDENT_FILE_ERROR);
    }
    const parsedTypes: string[] = JSON.parse(types);
    const newFiles = files.files.map((file, i) => {
      const type = parsedTypes.find((type, index) => {
        if (index === i) {
          return type;
        }
      });
      return {
        ...file,
        documentType: type,
      };
    });
    const buffers: Buffer[] = [];
    const attachments: IAttachmentPayload[] = newFiles.map((file) => {
      const fileName = file.originalname.replace(this.regExp, `${uuidv4()}$2`);
      const attachment: IAttachmentPayload = {
        extension: file.originalname.split('.')[1],
        fileName,
        mediaType: file.mimetype,
        name: file.originalname,
        documentType: file.documentType,
      };
      buffers.push(file.buffer);
      return attachment;
    });
    const payload: IPayloadUploadFileStudent = {
      attachments,
      files: buffers,
      studentId,
      courseId,
    };
    return this.uploadFileStudent.process(payload);
  }

  @Get('/:id/attachment/contract/:contractId')
  @Roles(RoleEnum.STUDENT)
  public async getDataStudent(
    @Param('contractId') contractId: string,
    @Param('id') id: string,
    @UserId() userId: string
  ) {
    return this.getDataStudentByContractId.process({ contractId, userId, id });
  }

  @Get('/courses')
  @Roles(RoleEnum.STUDENT)
  public async courses() {
    return this.listAllCourse.process();
  }

  @Put('/:id/profile')
  @Roles(RoleEnum.STUDENT)
  public async updateProfileStudent(
    @Body() payload: StudentUpdateDataDto,
    @Param('id') id: string
  ) {
    payload.id = id;
    return this.updateStudent.process(payload);
  }
}
