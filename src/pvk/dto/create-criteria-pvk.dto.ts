import { ApiProperty } from '@nestjs/swagger';

export class CreateWeightedCriteria {
  @ApiProperty({
    type: Number,
    description: 'EvaluationCriteria entity ID',
  })
  criteria_id: number;

  @ApiProperty({
    type: Number,
    description: 'EvaluationCriteria weight',
  })
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
