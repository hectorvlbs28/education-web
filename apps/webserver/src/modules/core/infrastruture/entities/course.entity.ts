import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { CoreORMEntity } from './core-orm.entity';
import { StudentEntity } from './student.entity';
import { ContractEntity } from './contract.entity';
import { AttachmentEntity } from './attachment.entity';
import { IMonthlyPayment } from '../../domain/interfaces/monthly-payment.interface';
import { CourseCategoryEnum } from '../../domain/enums/course-category.enum';

@Entity({ name: 'courses' })
export class CourseEntity extends CoreORMEntity {
  @Column({ type: 'varchar', name: 'name' })
  name: string;

  @Column({ type: 'varchar', name: 'description', nullable: true })
  description: string;

  @Column({
    type: 'numeric',
    name: 'registration',
    nullable: true,
    default: 2950,
  })
  registration: number;

  @Column({
    type: 'json',
    name: 'monthly_payment',
    nullable: true,
    default: [
      {
        amount: '1800',
        level: '1',
        paymentDate: null,
      },
      {
        amount: '1830',
        level: '2',
        paymentDate: null,
      },
      {
        amount: '1860',
        level: '3',
        paymentDate: null,
      },
      {
        amount: '1890',
        level: '4',
        paymentDate: null,
      },
      {
        amount: '1920',
        level: '5',
        paymentDate: null,
      },
    ],
  })
  monthlyPayments: IMonthlyPayment;

  @Column({ type: 'json', name: 'start_date', default: null })
  startDate: object;

  @Column({
    type: 'enum',
    enum: CourseCategoryEnum,
    name: 'course_category',
    nullable: true,
  })
  courseCategory: CourseCategoryEnum;

  @ManyToMany(() => StudentEntity, (student) => student.courses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  students: StudentEntity[];

  @OneToMany(() => ContractEntity, (contract) => contract.course, {
    cascade: true,
  })
  contracts: ContractEntity[];

  @ManyToMany(() => AttachmentEntity, (attachment) => attachment.courses, {
    cascade: true,
  })
  @JoinTable({
    name: 'attachment_courses',
    joinColumn: { name: 'course_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'attachment_id', referencedColumnName: 'id' },
  })
  attachments: AttachmentEntity[];

  constructor(aggregate: any) {
    super();

    if (aggregate) {
      const parsedEntity = JSON.parse(JSON.stringify(aggregate));
      Object.assign(this, parsedEntity);
      if (parsedEntity.attachments) {
        this.attachments = parsedEntity.attachments.map(
          (attachment) => new AttachmentEntity(attachment)
        );
      }
      if (parsedEntity.contracts) {
        this.contracts = parsedEntity.contracts.map(
          (contract) => new ContractEntity(contract)
        );
      }
    }
  }
}
