import {
  AutoIncrement,
  BelongsTo,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ParamEntity } from '../../param/entities/param.entity';
import { TestEntity } from './test.entity';

@Table
export class TestParamEntity extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  param_id: number;

  @BelongsTo(() => ParamEntity, 'param_id')
  param: ParamEntity;

  @Column
  test_id: number;

  @BelongsTo(() => TestEntity, 'test_id')
  test: TestEntity;
}
