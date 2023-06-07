import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ProfessionEntity } from './profession.entity';
import { PvkEntity } from '../../pvk/entities/pvk.entity';

@Table
export class ProfessionPvkEntity extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  prof_id: number;

  @BelongsTo(() => ProfessionEntity, 'prof_id')
  prof: ProfessionEntity;

  @Column
  pvk_id: number;

  @BelongsTo(() => PvkEntity, 'pvk_id')
  pvk: PvkEntity;

  @Column({
    type: DataType.FLOAT,
  })
  weight: number;
}
