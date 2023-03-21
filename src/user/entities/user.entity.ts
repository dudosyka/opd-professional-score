import {
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table
export class UserEntity extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column({
    defaultValue: 0,
  })
  sex: number;

  @Column({
    defaultValue: 0,
  })
  birthday: number;

  @Column
  login: string;

  @Column
  hash: string;

  @Column
  role: number;
}
