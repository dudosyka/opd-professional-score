import {
  AutoIncrement,
  BelongsToMany,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { EvaluationCriteriaEntity } from './evaluation.criteria.entity';

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
    () => EvaluationCriteriaEntity,
    'pvk_id',
    'id',
  )
  criteria: EvaluationCriteriaEntity[];
}
