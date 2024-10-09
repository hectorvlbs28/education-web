import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StudentEntity } from './student.entity';
import { CourseEntity } from './course.entity';

@Entity({ name: 'attachments' })
export class AttachmentEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', name: 'media_type', nullable: true })
  mediaType: string;

  @Column({ type: 'varchar', name: 'file_name', nullable: true })
  fileName: string;

  @Column({ type: 'varchar', name: 'name', nullable: true })
  name: string;

  @Column({ type: 'varchar', name: 'extension', nullable: true })
  extension: string;

  @Column({ type: 'varchar', name: 'document_type', nullable: true })
  documentType: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    nullable: true,
  })
  updatedAt: Date;

  @ManyToMany(() => StudentEntity, (course) => course.attachments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  students: StudentEntity[];

  @ManyToMany(() => CourseEntity, (course) => course.attachments, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  courses: CourseEntity[];

  constructor(aggregate: any) {
    if (aggregate) {
      const parsedEntity = JSON.parse(JSON.stringify(aggregate));
      Object.assign(this, parsedEntity);
    }
  }
}
