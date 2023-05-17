import {
  AutoIncrement,
  BelongsToMany,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ParamEntity } from '../../param/entities/param.entity';
import { EvaluationCriteriaParamsEntity } from './evaluation.criteria.params.entity';

@Table
export class EvaluationCriteriaEntity extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;

  @BelongsToMany(
    () => ParamEntity,
    () => EvaluationCriteriaParamsEntity,
    'criteria_id',
    'param_id',
  )
  params: ParamEntity[];
}
