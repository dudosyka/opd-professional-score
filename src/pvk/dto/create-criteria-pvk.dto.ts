import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min } from 'class-validator';

export class CreateWeightedCriteria {
  @ApiProperty({
    type: Number,
    description: 'EvaluationCriteria entity ID',
  })
  @IsNumber(
    {},
    {
      message: 'criteria_id must be number',
    },
  )
  criteria_id: number;

  @ApiProperty({
    type: Number,
    description: 'EvaluationCriteria weight',
  })
  @IsNumber(
    {},
    {
      message: 'weight must be number',
    },
  )
  @Min(0)
  @Max(1)
  weight: number;
}

export class CreateCriteriaPvkDto {
  @ApiProperty({
    isArray: true,
    type: CreateWeightedCriteria,
    description: 'Weighted criteria list',
  })
  criteria: CreateWeightedCriteria[];
}
