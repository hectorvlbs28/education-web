import { Injectable } from '@nestjs/common';
import { IContractRepository } from '../../domain/interfaces/contrac-repository.interface';
import { Contract } from '../../domain/entities/contract';
import { BaseRepository } from '../../../core/infrastruture/repositories/base-repository';
import { DataSource } from 'typeorm';
import { ContractEntity } from '../../../core/infrastruture/entities/contract.entity';

@Injectable()
export class ContractRepository
  extends BaseRepository<Contract>
  implements IContractRepository<Contract>
{
  private readonly aliasName = 'contract';
  constructor(private readonly dataSource: DataSource) {
    super(Contract, dataSource);
  }

  public async findById(id: string): Promise<Contract> {
    const entity = await this.manager
      .createQueryBuilder(ContractEntity, this.aliasName)
      .where(`${this.aliasName}.id = :id`, { id })
      .leftJoinAndSelect(`${this.aliasName}.course`, 'course')
      .getOne();
    return entity && Contract.hydrate(entity);
  }

  public async persist(entity: Contract): Promise<Contract> {
    const ormEntity = new ContractEntity(entity);
    ormEntity.updatedAt = new Date();
    await this.manager.save(ormEntity);
    return entity;
  }
}
