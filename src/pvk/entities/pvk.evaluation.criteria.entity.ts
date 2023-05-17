import {
  AutoIncrement,
  BelongsTo,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { PvkEntity } from './pvk.entity';
import { EvaluationCriteriaEntity } from './evaluation.criteria.entity';

@Table
export class PvkEvaluationCriteriaEntity extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  pvk_id: number;

  @BelongsTo(() => PvkEntity, 'pvk_id')
  pvk: PvkEntity;

  @Column
  criteria_id: number;

  @BelongsTo(() => EvaluationCriteriaEntity, 'criteria_id')
  criteria: EvaluationCriteriaEntity;

  @Column
  weight: number;
}
