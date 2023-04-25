import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UserEntity } from '../../user/entities/user.entity';
import { TestEntity } from '../../test/entities/test.entity';

@Table
export class UserTestEntity extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  test_id: number;

  @Column
  user_id: number;

  @BelongsTo(() => UserEntity, 'user_id')
  user: UserEntity;

  @BelongsTo(() => TestEntity, 'test_id')
  test: TestEntity;

  @Column({
    type: DataType.JSON,
  })
  result: any;
}
