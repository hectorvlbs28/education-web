import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { CoreORMEntity } from './core-orm.entity';
import { IMonthlyPayment } from '../../domain/interfaces/monthly-payment.interface';
import { CourseEntity } from './course.entity';
import { StatusCourseEnum } from '../../domain/enums/status-course.enum';

@Entity({ name: 'contracts' })
export class ContractEntity extends CoreORMEntity {
  @Column({ type: 'varchar', name: 'student_name' })
  studentsNanme: string;

  @Column({ type: 'varchar', name: 'school_name' })
  schoolName: string;

  @Column({ type: 'timestamp', name: 'date_birth_student' })
  dateBirthStudent: Date;

  @Column({ type: 'varchar', name: 'curp', nullable: true })
  curp: string;

  @Column({ type: 'varchar', name: 'student_phone' })
  studentPhone: string;

  @Column({ type: 'varchar', name: 'scholarship' })
  scholarship: string;

  @Column({ type: 'timestamp', name: 'start_date_service' })
  startDateService: Date;

  @Column({ type: 'varchar', name: 'modality' })
  modality: string;

  @Column({ type: 'varchar', name: 'annual_registration' })
  annualRegistration: string;

  @Column({ type: 'varchar', name: 'payment_annual_id', nullable: true })
  paymentAnnualId?: string;

  @Column({ type: 'json', name: 'monthly_payments' })
  monthlyPayments: IMonthlyPayment[];

  @Column({ type: 'varchar', name: 'document_id', nullable: true })
  documentId?: string;

  @Column({ type: 'boolean', name: 'signature', default: false })
  signature: boolean;

  @Column({ type: 'boolean', name: 'actived_contract', default: false })
  activatedContract: boolean;

  @Column({ type: 'int', name: 'discount', nullable: true, default: 0 })
  discount: number;

  @Column({
    type: 'enum',
    enum: StatusCourseEnum,
    nullable: true,
    default: StatusCourseEnum.PENDING,
  })
  status: StatusCourseEnum;

  @ManyToOne(() => CourseEntity, (course) => course.contracts, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'course_id' })
  course: CourseEntity;

  constructor(aggregate: any) {
    super();
    if (aggregate) {
      const parsedEntity = JSON.parse(JSON.stringify(aggregate));
      Object.assign(this, parsedEntity);

      if (parsedEntity.course) {
        this.course = new CourseEntity(parsedEntity.course);
      }
    }
  }
}
