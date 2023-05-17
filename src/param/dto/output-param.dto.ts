import { ApiProperty } from '@nestjs/swagger';

export class OutputParamDto {
  @ApiProperty({
    type: Number,
    description: 'Param name',
  })
  id: number;

  @ApiProperty({
    type: String,
    description: 'Param name',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Param description',
  })
  description: string;

  @ApiProperty({
    type: String,
    description: 'Key of param in result json',
  })
  key: string;

  @ApiProperty({
    type: String,
    description: 'Test title',
  })
  test_name: string;
}

export class WeightedParamDto extends OutputParamDto {
  @ApiProperty({
    type: Number,
    description: 'Param weight',
  })
  weight: number;

  @ApiProperty({
    type: Number,
    description: 'Param direction',
  })
  direction: number;

  @ApiProperty({
    type: Number,
    description: 'Param slice',
  })
  slice: number;
}
