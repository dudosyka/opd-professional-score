import {
  AutoIncrement,
  BelongsToMany,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { EvaluationCriteriaEntity } from './evaluation.criteria.entity';
import { PvkEvaluationCriteriaEntity } from './pvk.evaluation.criteria.entity';

@Table
export class PvkEntity extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;

  @Column
  description: string;

  @BelongsToMany(
    () => EvaluationCriteriaEntity,
    () => PvkEvaluationCriteriaEntity,
    'pvk_id',
    'criteria_id',
  )
  criteria: EvaluationCriteriaEntity[];
}
