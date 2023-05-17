import { ApiProperty } from '@nestjs/swagger';
import { WeightedCriteriaDto } from './output-criteria.dto';

export default class OutputPvkDto {
  @ApiProperty({
    type: Number,
    description: 'PVK entity ID',
  })
  id: number;

  @ApiProperty({
    type: String,
    description: 'PVK name',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'PVK description',
  })
  description: string;

  @ApiProperty({
    type: WeightedCriteriaDto,
    isArray: true,
  })
  criteria: WeightedCriteriaDto[];
}
