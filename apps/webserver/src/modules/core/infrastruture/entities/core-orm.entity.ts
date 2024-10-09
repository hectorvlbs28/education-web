import { BaseEntity, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';

export abstract class CoreORMEntity extends BaseEntity {
  @Column({ type: 'varchar', primary: true })
  id: string;

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

  protected removeEmptyArrays(jsonEntity: Record<string, any>): Record<string, any> {
    Object.keys(jsonEntity).map((item) => {
      if (Array.isArray(jsonEntity[item]) && jsonEntity[item].length === 0) {
        delete jsonEntity[item];
      }
    });
    return jsonEntity;
  }
}
