import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { TokenTypes } from '../../../core/domain/enums/token-types.enum';
import { TokenStatus } from '../../../core/domain/enums/token-status.enum';

import { UserEntity } from './user.entity';

@Entity({ name: 'tokens' })
export class TokenEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  token: string;

  @Column({ type: 'enum', enum: TokenTypes })
  type: TokenTypes;

  @Column({ type: 'enum', enum: TokenStatus })
  status: TokenStatus;

  @Column({ type: 'timestamp' })
  expiration: Date;

  @ManyToOne(() => UserEntity, (user) => user.tokens, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  public user: UserEntity;

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

  constructor(aggregate) {
    if (aggregate !== undefined) {
      this.id = aggregate.id;
      this.token = aggregate.value;
      this.status = aggregate.status;
      this.type = aggregate.type;
      this.expiration = aggregate.expiration;
      this.updatedAt = aggregate.updatedAt;
      this.createdAt = aggregate.createdAt;
    }
  }
}
