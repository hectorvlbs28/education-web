import { Entity } from 'typeorm';
import { UserEntity as CoreUserEntity } from '../../../core/infrastruture/entities/user.entity';

@Entity({ name: 'users' })
export class UserEntity extends CoreUserEntity {}
