import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString({
    message: 'name must be string',
  })
  @ApiProperty({
    type: String,
    description: 'User name',
  })
  name: string;

  @IsString({
    message: 'login must be string',
  })
  @ApiProperty({
    type: String,
    description: 'User login',
  })
  login: string;

  @IsString({
    message: 'password must be string',
  })
  @ApiProperty({
    type: String,
    description: 'User password',
  })
  password: string;

  @IsNumber(
    {},
    {
      message: 'sex must be number',
    },
  )
  @ApiProperty({
    type: Number,
    description: 'User sex',
  })
  sex: number;

  @IsNumber(
    {},
    {
      message: 'birthday must be int timestamp',
    },
  )
  @ApiProperty({
    type: Number,
    description: 'User sex',
  })
  birthday: number;
}
