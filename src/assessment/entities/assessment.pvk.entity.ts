import {
  AutoIncrement,
  BelongsTo,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { AssessmentEntity } from './assessment.entity';
import { PvkEntity } from '../../pvk/entities/pvk.entity';

@Table
export class AssessmentPvkEntity extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  assessment_id: number;

  @BelongsTo(() => AssessmentEntity, 'assessment_id')
  assessment: AssessmentEntity;

  @Column
  pvk_id: number;

  @BelongsTo(() => PvkEntity, 'pvk_id')
  pvk: PvkEntity;

  @Column
  grade: number;
}
