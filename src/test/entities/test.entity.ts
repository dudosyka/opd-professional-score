import {
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { TestParamEntity } from './test.param.entity';
import { ParamEntity } from '../../param/entities/param.entity';

@Table
export class TestEntity extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;

  @Column({
    type: DataType.TEXT,
  })
  description: string;

  @BelongsToMany(() => ParamEntity, () => TestParamEntity, 'test_id', 'id')
  params: ParamEntity[];
}
