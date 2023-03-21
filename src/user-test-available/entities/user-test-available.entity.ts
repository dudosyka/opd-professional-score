import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class UserTestAvailableEntity extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  user_id: number;

  @Column
  test_id: number;

  @Column
  relative_id: number;

  @Column({
    type: DataType.JSON,
  })
  settings: string;
}
