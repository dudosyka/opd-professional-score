import {
  AutoIncrement,
  BelongsToMany,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { TestEntity } from '../../test/entities/test.entity';
import { TestParamEntity } from '../../test/entities/test.param.entity';

@Table
export class ParamEntity extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;

  @Column
  description: string;

  @Column
  key: string;

  @BelongsToMany(() => TestEntity, () => TestParamEntity, 'param_id', 'test_id')
  tests: TestEntity[];
}
