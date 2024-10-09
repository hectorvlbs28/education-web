import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import {
  contractRepository,
  courseRepository,
  studentRepository,
  userRepository,
} from './infrastructure/constants/custom-providers';
import { CreateStudent } from './application/use-case/create-student';
import { StudentController } from './infrastructure/controllers/student.controller';
import { AuthModule } from '../auth/auth.module';
import { CreateContract } from './application/use-case/create-contract';
import { AnnualPayment } from './application/use-case/annual-payment';
import { MonthlyPayment } from './application/use-case/monthly-payment';
import { ContractSignNow } from './application/use-case/contract-sign-now';
import { GetContractById } from './application/use-case/get-contract-by-id';
import { UploadFileStudent } from './application/use-case/upload-file-student';
import { GetDataStudentByContractId } from './application/use-case/get-data-student-by-contract-id';
import { ListAllCourse } from './application/use-case/list-all-course';
import { UpdatePaymentContract } from './application/use-case/update-payment-contract';
import { UpdateStudent } from './application/use-case/update-student';

@Module({
  controllers: [StudentController],
  imports: [
    CoreModule,
    AuthModule,
    MulterModule.register({
      limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
      },
      fileFilter: (_req, file, callback) => {
        const allowedMimeTypes = ['application/pdf'];
        if (allowedMimeTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(null, false);
        }
      },
    }),
  ],
  providers: [
    studentRepository,
    CreateStudent,
    userRepository,
    contractRepository,
    CreateContract,
    AnnualPayment,
    MonthlyPayment,
    ContractSignNow,
    GetContractById,
    UploadFileStudent,
    GetDataStudentByContractId,
    courseRepository,
    ListAllCourse,
    UpdatePaymentContract,
    UpdateStudent,
  ],
})
export class StudentModule {}
