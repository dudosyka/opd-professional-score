import {
  AutoIncrement,
  BelongsTo,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { PvkEntity } from './pvk.entity';
import { TestEntity } from '../../test/entities/test.entity';
import { ParamEntity } from '../../param/entities/param.entity';

@Table
export class EvaluationCriteriaEntity extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  pvk_id: number;

  @BelongsTo(() => PvkEntity, 'pvk_id')
  pvk: PvkEntity;

  @Column
  test_id: number;

  @BelongsTo(() => TestEntity, 'test_id')
  test: TestEntity;

  @Column
  param_id: number;

  @BelongsTo(() => ParamEntity, 'param_id')
  param: ParamEntity;

  @Column
  weight: number;

  @Column
  direction: number;

  @Column
  slice: number;
}
