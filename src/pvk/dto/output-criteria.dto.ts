import { ApiProperty } from '@nestjs/swagger';
import { WeightedParamDto } from '../../param/dto/output-param.dto';

export class OutputCriteriaDto {
  @ApiProperty({
    type: Number,
    description: 'EvaluationCriteria entity ID',
  })
  id: number;

  @ApiProperty({
    type: String,
    description: 'EvaluationCriteria entity name',
  })
  name: string;

  @ApiProperty({
    type: WeightedParamDto,
    description: 'Criteria param',
  })
  params: WeightedParamDto[];
}

export class WeightedCriteriaDto extends OutputCriteriaDto {
  @ApiProperty({
    type: Number,
    description: 'Criteria weight',
  })
  weight: number;
}
