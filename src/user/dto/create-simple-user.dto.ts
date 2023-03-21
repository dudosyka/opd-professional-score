import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class CreateSimpleUserDto extends CreateUserDto {
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
