import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ParamEntity } from '../../param/entities/param.entity';
import { EvaluationCriteriaEntity } from './evaluation.criteria.entity';

@Table
export class EvaluationCriteriaParamsEntity extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  param_id: number;

  @BelongsTo(() => ParamEntity, 'param_id')
  param: ParamEntity;

  @Column
  criteria_id: number;

  @BelongsTo(() => EvaluationCriteriaEntity, 'criteria_id')
  criteria: EvaluationCriteriaEntity;

  @Column({
    type: DataType.FLOAT,
  })
  weight: number;

  @Column
  direction: number;

  @Column
  slice: number;
}
