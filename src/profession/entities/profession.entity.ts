import {
  AutoIncrement,
  BelongsTo,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UserEntity } from '../../user/entities/user.entity';

@Table
export class ProfessionEntity extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;

  @Column
  description: string;

  @Column
  author_id: number;

  @BelongsTo(() => UserEntity, 'author_id')
  author: UserEntity;
}
