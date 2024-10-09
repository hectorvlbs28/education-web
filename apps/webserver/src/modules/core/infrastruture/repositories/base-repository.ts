import KSUID = require('ksuid');
import { Identifier } from '../../domain/value-objects/identifier';
import { DataSource, Repository } from 'typeorm';
import { EntityTarget } from 'typeorm/common/EntityTarget';

export abstract class BaseRepository<T> extends Repository<T> {
  protected entityPrefix: string;

  constructor(target: EntityTarget<T>, dataSource: DataSource) {
    super(target, dataSource.createEntityManager());
  }

  public nextId(): Identifier {
    return new Identifier(`${this.entityPrefix}_${KSUID.randomSync().string}`);
  }

  public nextIdPrefix(prefix?: string): Identifier {
    return new Identifier(
      `${prefix ? prefix : this.entityPrefix}_${KSUID.randomSync().string}`
    );
  }
}
