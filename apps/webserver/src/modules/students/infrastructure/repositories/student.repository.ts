import { Injectable } from '@nestjs/common';
import { IStudentRepository } from '../../domain/interfaces/student-repository.interface';
import { Student } from '../../domain/entities/student';
import { BaseRepository } from '../../../core/infrastruture/repositories/base-repository';
import { DataSource } from 'typeorm';
import { StudentEntity } from '../../../core/infrastruture/entities/student.entity';
import { Identifier } from '../../../core/domain/value-objects/identifier';

@Injectable()
export class StudentRepository
  extends BaseRepository<Student>
  implements IStudentRepository<Student>
{
  private readonly aliasName = 'student';
  protected readonly entityPrefix = 'STD';

  constructor(private readonly dataSource: DataSource) {
    super(Student, dataSource);
  }

  public async persist(entity: Student): Promise<Student> {
    const ormEntity = new StudentEntity(entity);
    ormEntity.updatedAt = new Date();
    await this.manager.save(ormEntity);
    return entity;
  }

  public async findById(id: string): Promise<Student> {
    const entity = await this.manager
      .createQueryBuilder(StudentEntity, this.aliasName)
      .where(`${this.aliasName}.id = :id`, { id: id })
      .leftJoinAndSelect(`${this.aliasName}.courses`, 'courses')
      .leftJoinAndSelect(`${this.aliasName}.addresses`, 'addresses')
      .leftJoinAndSelect('courses.contracts', 'contracts')
      .getOne();
    return entity && Student.hydrate(entity);
  }

  public async findByEmail(email: string): Promise<Student> {
    const entity = await this.manager
      .createQueryBuilder(StudentEntity, this.aliasName)
      .where(`${this.aliasName}.email = :email`, { email })
      .getOne();
    return entity && Student.hydrate(entity);
  }

  public async findStudentByUserIdAndContractId(
    userId: string,
    contractId: string,
    id: string
  ): Promise<Student> {
    const entity = await this.manager
      .createQueryBuilder(StudentEntity, this.aliasName)
      .where(`${this.aliasName}.id = :id`, { id })
      .leftJoinAndSelect(`${this.aliasName}.user`, 'user')
      .leftJoinAndSelect(`${this.aliasName}.contract`, 'contract')
      .leftJoinAndSelect(`${this.aliasName}.attachments`, 'attachments')
      .where('contract.id = :contractId', { contractId })
      .andWhere('user.id = :userId', { userId })
      .getOne();
    if (entity) {
      return Student.hydrate(entity);
    }
    return null;
  }

  public prefixId(entityName: string): Identifier {
    const prefix = entityName.slice(0, 3).toUpperCase();
    return this.nextIdPrefix(prefix);
  }
}
