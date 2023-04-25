import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UserTestFilterDto {
  @IsNumber(
    {},
    {
      message: 'age must be number',
    },
  )
  @ApiProperty({
    type: Number,
    description: 'User age filter',
  })
  age: number;

  @IsNumber(
    {},
    {
      message: 'sex must be number',
    },
  )
  @ApiProperty({
    type: Number,
    description: 'User sex filter',
  })
  sex: number;
}
