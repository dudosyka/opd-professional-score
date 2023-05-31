import { IsNumber, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWeightedParam {
  @IsNumber(
    {},
    {
      message: 'param_id must be numeric',
    },
  )
  @ApiProperty({
    type: Number,
    description: 'Param entity id',
  })
  param_id: number;

  @IsNumber(
    {},
    {
      message: 'weight must be numeric',
    },
  )
  @Min(0)
  @Max(1)
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
    description: 'Param direction',
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
    description: 'Param slice',
  })
  slice: number;
}

export class CreateParamDto {
  @IsString({
    message: 'name must be string',
  })
  @ApiProperty({
    type: String,
    description: 'Param name',
  })
  name: string;

  @IsString({
    message: 'description must be string',
  })
  @ApiProperty({
    type: String,
    description: 'Param description',
  })
  description: string;

  @IsNumber(
    {},
    {
      message: 'direction must be numeric',
    },
  )
  @ApiProperty({
    type: Number,
    description: 'Param direction',
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
    description: 'Param slice',
  })
  slice: number;

  @IsString({
    message: 'key must be string',
  })
  @ApiProperty({
    type: String,
    description: 'Key of param in result json',
  })
  key: string;
}
