import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { TestEntity } from '../../test/entities/test.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Table
export class UserTestAvailableEntity extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  user_id: number;

  @BelongsTo(() => UserEntity, 'user_id')
  user: UserEntity;

  @Column
  test_id: number;

  @BelongsTo(() => TestEntity, 'test_id')
  test: TestEntity;

  @Column
  relative_id: number;

  @Column({
    type: DataType.JSON,
  })
  settings: string;
}
