import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UserEntity } from '../../user/entities/user.entity';
import { PvkEntity } from '../../pvk/entities/pvk.entity';
import { ProfessionPvkEntity } from './profession.pvk.entity';

@Table
export class ProfessionEntity extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;

  @Column
  description: string;

  @Column
  author_id: number;

  @BelongsTo(() => UserEntity, 'author_id')
  author: UserEntity;

  @BelongsToMany(
    () => PvkEntity,
    () => ProfessionPvkEntity,
    'prof_id',
    'pvk_id',
  )
  pvk: PvkEntity[];
}
