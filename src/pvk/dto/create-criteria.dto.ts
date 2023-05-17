import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

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

export class CreateCriteriaDto {
  @ApiProperty({
    type: String,
    description: 'Criteria name',
  })
  @IsString({
    message: 'name must be string',
  })
  name: string;

  @ApiProperty({
    isArray: true,
    type: CreateWeightedParam,
    description: 'Create criteria data',
  })
  @ValidateNested({
    message: 'criteria must be array',
    each: true,
  })
  @Type(() => CreateWeightedParam)
  params: CreateWeightedParam[];
}
