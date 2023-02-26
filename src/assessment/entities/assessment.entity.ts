import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ProfessionEntity } from '../../profession/entities/profession.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { PvkEntity } from '../../pvk/entities/pvk.entity';
import { AssessmentPvkEntity } from './assessment.pvk.entity';

@Table
export class AssessmentEntity extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  profession_id: number;

  @BelongsTo(() => ProfessionEntity, 'profession_id')
  profession: ProfessionEntity;

  @Column
  user_id: number;

  @BelongsTo(() => UserEntity, 'user_id')
  user: UserEntity;

  @BelongsToMany(
    () => PvkEntity,
    () => AssessmentPvkEntity,
    'assessment_id',
    'id',
  )
  pvk: PvkEntity[];
}
