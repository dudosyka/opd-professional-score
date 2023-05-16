import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCriteriaDto {
  @IsNumber(
    {},
    {
      message: 'test_id must be numeric',
    },
  )
  @ApiProperty({
    type: Number,
    description: 'Test ID',
  })
  test_id: number;

  @IsNumber(
    {},
    {
      message: 'param_id must be numeric',
    },
  )
  @ApiProperty({
    type: Number,
    description: 'Param ID',
  })
  param_id: number;

  @IsNumber(
    {},
    {
      message: 'weight must be numeric',
    },
  )
  @ApiProperty({
    type: Number,
    description: 'Param weight',
  })
  weight: number;

  @IsNumber(
    {},
    {
      message: 'direction must be numeric',
    },
  )
  @ApiProperty({
    type: Number,
    description: 'Param evaluating direction',
  })
  direction: number;

  @IsNumber(
    {},
    {
      message: 'slice must be numeric',
    },
  )
  @ApiProperty({
    type: Number,
    description: 'Param slice point',
  })
  slice: number;
}
