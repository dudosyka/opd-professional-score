import {
  AutoIncrement,
  Column,
  DataType,
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
    type: DataType.BIGINT,
    defaultValue: 0,
  })
  birthday: number;

  public calculateAge(): number {
    const yearInSeconds = 365 * 24 * 60 * 60 * 1000;
    return Math.floor((Date.now() - this.birthday) / yearInSeconds);
  }

  @Column
  login: string;

  @Column
  hash: string;

  @Column
  role: number;
}
