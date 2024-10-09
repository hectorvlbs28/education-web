import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StudentEntity } from './student.entity';

@Entity({ name: 'addresses' })
export class AddressEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'int', name: 'zip_code' })
  zipCode: number;

  @Column({ type: 'varchar', name: 'city' })
  city: string;

  @Column({ type: 'varchar', name: 'country' })
  country: string;

  @Column({ type: 'varchar', name: 'state' })
  state: string;

  @Column({ type: 'varchar', name: 'street_name' })
  streetName: string;

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

  @ManyToMany(() => StudentEntity, (student) => student.addresses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  students: StudentEntity[];

  constructor(aggregate: any) {
    if (aggregate) {
      const parsedEntity = JSON.parse(JSON.stringify(aggregate));
      Object.assign(this, parsedEntity);
    }
  }
}
