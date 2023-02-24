import {
  AutoIncrement,
  BelongsTo,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ProfessionEntity } from '../../profession/entities/profession.entity';
import { UserEntity } from '../../user/entities/user.entity';

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
}
