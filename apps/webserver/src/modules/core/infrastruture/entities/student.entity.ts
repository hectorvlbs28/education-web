import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { CoreORMEntity } from './core-orm.entity';
import { UserEntity } from './user.entity';
import { AttachmentEntity } from './attachment.entity';
import { CourseEntity } from './course.entity';
import { AddressEntity } from './address.entity';

@Entity({ name: 'students' })
export class StudentEntity extends CoreORMEntity {
  @Column({ type: 'varchar', name: 'full_name' })
  fullName: string;

  @Column({ type: 'varchar', name: 'email' })
  email: string;

  @Column({ type: 'timestamp', name: 'birth_date' })
  birthDate: Date;

  @Column({ type: 'varchar', name: 'gender' })
  gender: string;

  @Column({ type: 'varchar', name: 'curp', nullable: true })
  curp: string;

  @Column({ type: 'varchar', name: 'last_degree_study' })
  lastDegreeStudy: string;

  @Column({ type: 'varchar', name: 'phone', nullable: true })
  phone: string;

  @Column({ type: 'varchar', name: 'nationality' })
  nationality: string;

  @Column({ type: 'varchar', name: 'study_modality' })
  studyModality: string;

  @Column({ type: 'boolean', name: 'younger', default: false })
  younger: boolean;

  @Column({ type: 'varchar', name: 'father_full_name', nullable: true })
  fatherFullName?: string;

  @Column({ type: 'text', name: 'avatar', nullable: true })
  avatar?: string;

  @ManyToOne(() => UserEntity, (user) => user.students, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToMany(() => CourseEntity, (course) => course.students, {
    cascade: true,
  })
  @JoinTable({
    name: 'student_courses',
    joinColumn: { name: 'student_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'course_id', referencedColumnName: 'id' },
  })
  courses: CourseEntity[];

  @ManyToMany(() => AddressEntity, (address) => address.students, {
    cascade: true,
  })
  @JoinTable({
    name: 'address_students',
    joinColumn: { name: 'student_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'address_id', referencedColumnName: 'id' },
  })
  addresses: AddressEntity[];

  @ManyToMany(() => AttachmentEntity, (attachment) => attachment.students, {
    cascade: true,
  })
  @JoinTable({
    name: 'attachment_students',
    joinColumn: { name: 'student_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'attachment_id', referencedColumnName: 'id' },
  })
  attachments: AttachmentEntity[];

  constructor(aggregate: any) {
    super();

    if (aggregate) {
      const parsedEntity = JSON.parse(JSON.stringify(aggregate));
      Object.assign(this, parsedEntity);
      if (parsedEntity.courses) {
        this.courses = parsedEntity.courses.map(
          (course) => new CourseEntity(course)
        );
      }

      if (parsedEntity.attachments) {
        this.attachments = parsedEntity.attachments.map(
          (att) => new AttachmentEntity(att)
        );
      }

      if (parsedEntity.addresses) {
        this.addresses = parsedEntity.addresses.map(
          (address) => new AddressEntity(address)
        );
      }
    }
  }
}
