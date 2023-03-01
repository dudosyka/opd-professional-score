import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class PvkAssessmentDto {
  @IsNumber(
    {},
    {
      message: 'pvk_id must be numeric',
    },
  )
  @ApiProperty({
    type: Number,
    description: 'PVK entity ID',
  })
  pvk_id: number;

  @IsNumber(
    {},
    {
      message: 'grade is must be numeric',
    },
  )
  @ApiProperty({
    type: Number,
    description: 'PVK position in assessment list',
  })
  grade: number;

  name: string;
}
